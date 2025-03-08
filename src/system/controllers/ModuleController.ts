import { Request, Response } from "express";
import { promises as fs } from "fs";


export default class ModuleController
{
    public test: string = '';
    protected systemDir: string = './src/system';
    protected modelDir: string = './src/models';

    public updateLoadModel = async (req: Request): Promise<boolean> =>
    {
        const { endpoint } = req.query;
        const loadModelsPath: string = './src/models/LoadModels.ts';
        const modelName:string = this.mergeModelName(req);
        
        try {
            let loadModelsContent = await fs.readFile(loadModelsPath, 'utf-8');
            let updatedContent = loadModelsContent.replace('export default app;', '');
            updatedContent += `import ${modelName} from "./${modelName}";`;
            updatedContent += `\napp.use('/${endpoint}', dynamicRoute(${modelName}));`;
            updatedContent += '\n\nexport default app;';
            await fs.writeFile(loadModelsPath, updatedContent, 'utf-8');

            return true;
        } catch (err) {
            console.log(err instanceof Error ? err.message : 'unknown error');
            return false;
        }
    }

    public createModel = async (req: Request, res: Response): Promise<Response> =>
    {
        try {
            const modelName = this.mergeModelName(req);
            if (!modelName) {
                throw new Error('invalid model name');
            }

            const updateLoadModel = await this.updateLoadModel(req);
            if (!updateLoadModel) {
                throw new Error('failed to load model');
            }

            const generateModel = await this.generateModel(req);
            if (!generateModel) {
                throw new Error('failed to generate model');
            }
            return res.status(200).json({
                status: true,
                message: 'model successfully created!',
            });
        } catch(err) {
            return res.status(500).json({
                status: false,
                message: `internal server error: ${err instanceof Error ? err.message:'-- unknown error --'}`,
            });
        }
    }

    protected generateModel = async (req: Request): Promise<boolean> =>
    {
        try {
            const modelName = this.mergeModelName(req);

            // read template
            const locationTemplate = `${this.systemDir}/templates/model.ts`;
            const templateModel = await fs.readFile(locationTemplate, 'utf-8');

            const modelPath = `${this.modelDir}/${modelName}.ts`;
            let existingModel = '';
            // check if model exist
            try {
                existingModel = await fs.readFile(modelPath, 'utf-8');
            } catch (err) {
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

                await fs.writeFile(`${this.modelDir}/${modelName}.ts`, updatedTemplate, 'utf-8');
            }
            
            return true;
        } catch (err) {
            console.log(`failed to generate model: ${err instanceof Error ? err.message : 'unknown error'}`);
            return false;
        }
    }

    // Fungsi untuk memformat schema agar lebih rapi
    protected formatSchemaContent(schema: string) {
        return JSON.stringify(schema, null, 4)
            .replace(/"(\w+)"\s*:/g, '$1:') // hapus tanda kutip di key
            .replace(/type:\s*"(\w+)"/g, 'type:$1') // ubah tipe data ke format TypeScript
            .replace('{', '{\t')
            .replaceAll('},', '},\t\t')
            .replaceAll(':', ':\xa0')
            .replace('}\n}', '}\n\t},');
    }

    // Fungsi untuk memformat types agar lebih rapi
    protected formatTypesContent(types: string) {
        return JSON.stringify(types, null, 4)
            .replace(/"(\w+)"\s*:/g, '$1:') // hapus tanda kutip di key
            .replace(/:\s*"(\w+)"/g, ':$1') // ubah tipe data ke format TypeScript
            .replace('{\n', '')
            .replaceAll(':', ':\xa0')
            .replace('}', '');
    }

    protected mergeModelName = (req: Request): string => {
        // new filename
        const fileName: string | undefined = req.query.model?.toString().trim();
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
    }

    protected replaceContent = async (modelName: string, modelContent: string): Promise<string> =>
    {
        return modelContent
            .replaceAll('varSchema', `${modelName}Schema`)
            .replaceAll('TableSchema', `${modelName}`)
            .replaceAll('modelName', `${modelName}`)
            .replaceAll('IModel', `I${modelName}`)
            .replaceAll('ISchema', `I${modelName}Schema`);
    }
}