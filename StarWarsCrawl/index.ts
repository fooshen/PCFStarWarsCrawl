import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class StarWarsCrawl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _scriptElement: HTMLScriptElement;
	private _textNameElement: HTMLParagraphElement;  //label element for episode name (eg. Episode II)
	private _textTitleElement: HTMLHeadingElement; //heading element for episode title (eg. Empire Strikes Back)
	private _textElement: HTMLParagraphElement; //label element for the crawling text (A long time ago...)
	private _rootContainer: HTMLDivElement; //parent element that holds the texts
	private _fadeContainer: HTMLDivElement;
	private _sectionContainer: HTMLDivElement;
	private _crawlContainer: HTMLDivElement;
	private _titleContainer: HTMLDivElement;

	private _notifyOutputChanged: () => void;
	private _refreshData: EventListenerOrEventListenerObject;
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		//this._context = context;		
		const controlScript = "var toggle = true;function startPause(crawl){if(toggle) {crawl.style.animationPlayState = 'paused';} else { crawl.style.animationPlayState = 'running';} toggle = !toggle;}" +
			"function restart() { var crawl = document.querySelectorAll('.crawl');crawl[0].style.animation = 'none';crawl[0].offsetWidth;crawl[0].style.animation = 'crawl 60s linear';}";
		
		var enablePause = context.parameters.EnablePause.raw ? context.parameters.EnablePause.raw : false;		

		this._rootContainer = document.createElement("div");
		this._rootContainer.setAttribute("class", "container");
		
		this._fadeContainer = document.createElement("div");
		this._fadeContainer.setAttribute("class", "fade");
		this._rootContainer.appendChild(this._fadeContainer);

		this._sectionContainer = document.createElement("div");
		this._sectionContainer.setAttribute("class", "star-wars");

		this._crawlContainer = document.createElement("div");
		this._crawlContainer.setAttribute("class", "crawl");
		if(enablePause) { 
			this._crawlContainer.setAttribute("onclick", "javascript: startPause(this);");
			this._crawlContainer.setAttribute("style", "cursor: hand");
		}
		else { 
			this._crawlContainer.removeAttribute("onclick");
			this._crawlContainer.setAttribute("style", "cursor: default");
		}

		this._titleContainer = document.createElement("div");
		this._titleContainer.setAttribute("class", "title");

		this._textNameElement = document.createElement("p");
		this._textNameElement.innerHTML = context.parameters.EpisodeNumber.raw ? context.parameters.EpisodeNumber.raw : "Episode I";
		this._textTitleElement = document.createElement("h1");
		this._textTitleElement.innerHTML = context.parameters.EpisodeName.raw ? context.parameters.EpisodeName.raw: "A New Hope ";
		this._titleContainer.appendChild(this._textNameElement);
		this._titleContainer.appendChild(this._textTitleElement);

		this._textElement = document.createElement("p");
		this._textElement.innerHTML = context.parameters.CrawlText.raw ? context.parameters.CrawlText.raw : "Llorem ipsum...";

		this._crawlContainer.appendChild(this._titleContainer);
		this._crawlContainer.appendChild(this._textElement);

		this._sectionContainer.appendChild(this._crawlContainer);
		this._rootContainer.appendChild(this._sectionContainer);

		container.appendChild(this._rootContainer);
		this._notifyOutputChanged = notifyOutputChanged;
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		var enablePause = context.parameters.EnablePause.raw ? context.parameters.EnablePause.raw : false;
		if(enablePause) { 
//todo
		}
		else { 
//todo
		}

		//if restart, remove animation and add it back
		var play = context.parameters.Play.raw ? context.parameters.Play.raw: false;
		if(play){
			this._crawlContainer.setAttribute("class", "crawl");
		}
		else{ 	
			this._crawlContainer.setAttribute("class", "");
		}

		this._textNameElement.innerHTML = context.parameters.EpisodeNumber.raw ? context.parameters.EpisodeNumber.raw : "Episode 1";
		this._textTitleElement.innerHTML = context.parameters.EpisodeName.raw ? context.parameters.EpisodeName.raw : "A New Hope";
		this._textElement.innerHTML = context.parameters.CrawlText.raw ? context.parameters.CrawlText.raw : "Llorem ipsum...";
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}
