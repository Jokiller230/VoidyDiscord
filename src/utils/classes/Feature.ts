export class Feature {
    constructor(options: FeatureOptions) {
        this.name = options.name;
        this.version = options.version;
    }

    public name: string;
    public version: string;
}

export interface FeatureOptions {
    name: string,
    version: string,
}