export class Feature {
    constructor(options: FeatureOptions) {
        this.name = options.name;
        this.description = options.description;
        this.version = options.version;
    }

    public name: string;
    public description: string;
    public version: string;
}

export interface FeatureOptions {
    name: string,
    description: string,
    version: string,
}