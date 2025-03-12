"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class ModuleController {
    test = '';
    systemDir = './src/system';
    modelDir = './src/models';
    updateLoadModel = async (req) => {
        const { endpoint } = req.query;
        const loadModelsPath = './src/models/LoadModels.ts';
        const modelName = this.mergeModelName(req);
        try {
            let loadModelsContent = await fs_1.promises.readFile(loadModelsPath, 'utf-8');
            if (loadModelsContent.includes(`./${modelName}`)) {
                throw new Error('model already exists.');
            }
            let updatedContent = loadModelsContent.replace('export default app;', '');
            updatedContent += `import ${modelName} from "./${modelName}";`;
            updatedContent += `\napp.use('/${endpoint}', dynamicRoute(${modelName}));`;
            updatedContent += '\n\nexport default app;';
            await fs_1.promises.writeFile(loadModelsPath, updatedContent, 'utf-8');
            return true;
        }
        catch (err) {
            throw new Error(err instanceof Error ? err.message : 'failed to load model.');
        }
    };
    createModel = async (req, res) => {
        try {
            const modelName = this.mergeModelName(req);
            if (!modelName) {
                throw new Error('invalid model name');
            }
            await this.updateLoadModel(req);
            const generateModel = await this.generateModel(req);
            if (!generateModel) {
                throw new Error('failed to generate model');
            }
            return res.status(200).json({
                status: true,
                message: 'model successfully created!',
            });
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: `internal server error: ${err instanceof Error ? err.message : '-- unknown error --'}`,
            });
        }
    };
    generateModel = async (req) => {
        try {
            const modelName = this.mergeModelName(req);
            // read template
            const locationTemplate = `${this.systemDir}/templates/model.ts`;
            const templateModel = await fs_1.promises.readFile(locationTemplate, 'utf-8');
            const modelPath = `${this.modelDir}/${modelName}.ts`;
            let existingModel = '';
            // check if model exist
            try {
                existingModel = await fs_1.promises.readFile(modelPath, 'utf-8');
            }
            catch (err) {
                // if there is no model, use default template
                existingModel = templateModel;
            }
            // change placeholder content
            let updatedTemplate = existingModel;
            updatedTemplate = await this.replaceContent(modelName, updatedTemplate);
            const { schema, types } = req.body;
            if (schema || types) {
                if (schema) {
                    let updatedContent = this.formatSchemaContent(schema);
                    updatedTemplate = updatedTemplate.replace('{},//schema', updatedContent);
                }
                if (types) {
                    let updatedTypes = this.formatTypesContent(types);
                    updatedTemplate = updatedTemplate.replace('// type', updatedTypes);
                }
                await fs_1.promises.writeFile(`${this.modelDir}/${modelName}.ts`, updatedTemplate, 'utf-8');
            }
            return true;
        }
        catch (err) {
            console.log(`failed to generate model: ${err instanceof Error ? err.message : 'unknown error'}`);
            return false;
        }
    };
    // Fungsi untuk memformat schema agar lebih rapi
    formatSchemaContent(schema) {
        return JSON.stringify(schema, null, 4)
            .replace(/"(\w+)"\s*:/g, '$1:') // hapus tanda kutip di key
            .replace(/type:\s*"(\w+)"/g, 'type:$1') // ubah tipe data ke format TypeScript
            .replace('{', '{\t')
            .replaceAll('},', '},\t\t')
            .replaceAll(':', ':\xa0')
            .replace('}\n}', '}\n\t},')
            .replaceAll('"Schema.Types.ObjectId"', 'Schema.Types.ObjectId');
    }
    // Fungsi untuk memformat types agar lebih rapi
    formatTypesContent(types) {
        return JSON.stringify(types, null, 4)
            .replace(/"(\w+)"\s*:/g, '$1:') // hapus tanda kutip di key
            .replace(/:\s*"(\w+)"/g, ':$1') // ubah tipe data ke format TypeScript
            .replace('{\n', '')
            .replaceAll(':', ':\xa0')
            .replace('}', '')
            .replaceAll('"mongoose.Types.ObjectId"', 'mongoose.Types.ObjectId');
    }
    mergeModelName = (req) => {
        // new filename
        const fileName = req.query.model?.toString().trim();
        if (!fileName) {
            console.error(`invalid model name.`);
            return '';
        }
        // remove space
        const removeSpaceFileName = fileName.split(' ').join('');
        // merge word
        return removeSpaceFileName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
    };
    replaceContent = async (modelName, modelContent) => {
        return modelContent
            .replaceAll('varSchema', `${modelName}Schema`)
            .replaceAll('TableSchema', `${modelName}`)
            .replaceAll('modelName', `${modelName}`)
            .replaceAll('IModel', `I${modelName}`)
            .replaceAll('ISchema', `I${modelName}Schema`);
    };
}
exports.default = ModuleController;
//# sourceMappingURL=ModuleController.js.map