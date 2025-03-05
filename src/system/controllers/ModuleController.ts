import { Request, Response } from "express";
import { promises as fs } from "fs";


export default class ModuleController
{
    public test: string = '';
    protected systemDir: string = './src/system';
    protected modelDir: string = './src/models';

    public createModel = async (req: Request, res: Response): Promise<Response> =>
    {
        try {
            const generateModel = await this.generateModel(req);
            if (!generateModel) {
                throw new Error('invalid model name!');
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
            // read template
            const locationTemplate = `${this.systemDir}/templates/model.ts`;
            const templateModel = await fs.readFile(locationTemplate, 'utf-8');

            if (!this.mergeModelName(req)) return false;
            
            const modelName = this.mergeModelName(req);

            // replace content (file)
            let newTemplateModel = templateModel.replaceAll('varSchema', modelName);

            // write new file
            await fs.writeFile(`${this.modelDir}/${modelName}.ts`, newTemplateModel, 'utf-8');
            
            return true;
        } catch (err) {
            console.log(`failed to generate model: ${err instanceof Error ? err.message : 'unknown error'}`);
            return false;
        }
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
}