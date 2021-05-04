/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    CrawlText: ComponentFramework.PropertyTypes.StringProperty;
    EpisodeNumber: ComponentFramework.PropertyTypes.StringProperty;
    EpisodeName: ComponentFramework.PropertyTypes.StringProperty;
    Play: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    EnablePause: ComponentFramework.PropertyTypes.TwoOptionsProperty;
}
export interface IOutputs {
    CrawlText?: string;
    EpisodeNumber?: string;
    EpisodeName?: string;
    Play?: boolean;
    EnablePause?: boolean;
}
