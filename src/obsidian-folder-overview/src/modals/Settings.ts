import {
	Modal,
	type App,
	type MarkdownPostProcessorContext,
	type TFile,
	type SettingTab,
} from 'obsidian';
import { updateYaml, type defaultOverviewSettings, type includeTypes } from '../FolderOverview';
import { getFolderPathFromString } from '../utils/functions';
import { createOverviewSettings } from '../settings';
import FolderOverviewPlugin from '../main';
import FolderNotesPlugin from '../../../main';
import { tr } from '../../../i18n';

export class FolderOverviewSettings extends Modal {
	plugin: FolderOverviewPlugin | FolderNotesPlugin;
	app: App;
	yaml: defaultOverviewSettings;
	ctx: MarkdownPostProcessorContext;
	el: HTMLElement;
	defaultSettings: defaultOverviewSettings;
	constructor(
		app: App,
		plugin: FolderOverviewPlugin | FolderNotesPlugin,
		yaml: defaultOverviewSettings,
		ctx: MarkdownPostProcessorContext,
		el: HTMLElement,
		defaultSettings: defaultOverviewSettings,
	) {
		super(app);
		this.plugin = plugin;
		this.app = app;
		this.defaultSettings = defaultSettings;
		this.yaml = this.initializeYaml(yaml, ctx, defaultSettings);
		this.ctx = ctx ?? undefined;
		this.el = el ?? undefined;
		updateYaml(this.plugin, this.ctx, this.el, this.yaml, false);
	}

	private initializeYaml(
		yaml: defaultOverviewSettings,
		ctx: MarkdownPostProcessorContext | undefined,
		defaultSettings: defaultOverviewSettings,
	): defaultOverviewSettings {
		if (!yaml) {
			return this.defaultSettings;
		}
		if (ctx) {
			const includeTypes =
				yaml?.includeTypes ||
				defaultSettings.includeTypes ||
				['folder', 'markdown'];
			return {
				id: yaml?.id ?? crypto.randomUUID(),
				folderPath: yaml?.folderPath ?? getFolderPathFromString(ctx.sourcePath),
				title: yaml?.title ?? defaultSettings.title,
				showTitle: yaml?.showTitle ?? defaultSettings.showTitle,
				depth: yaml?.depth ?? defaultSettings.depth,
				style: yaml?.style ?? 'list',
				includeTypes: includeTypes.map((type) => type.toLowerCase()) as includeTypes[],
				disableFileTag: yaml?.disableFileTag ?? defaultSettings.disableFileTag,
				sortBy: yaml?.sortBy ?? defaultSettings.sortBy,
				sortByAsc: yaml?.sortByAsc ?? defaultSettings.sortByAsc,
				showEmptyFolders: yaml?.showEmptyFolders ?? defaultSettings.showEmptyFolders,
				onlyIncludeSubfolders: yaml?.onlyIncludeSubfolders ?? defaultSettings.onlyIncludeSubfolders,
				storeFolderCondition: yaml?.storeFolderCondition ?? defaultSettings.storeFolderCondition,
				showFolderNotes: yaml?.showFolderNotes ?? defaultSettings.showFolderNotes,
				disableCollapseIcon: yaml?.disableCollapseIcon ?? defaultSettings.disableCollapseIcon,
				alwaysCollapse: yaml?.alwaysCollapse ?? defaultSettings.alwaysCollapse,
				autoSync: yaml?.autoSync ?? defaultSettings.autoSync,
				allowDragAndDrop: yaml?.allowDragAndDrop ?? defaultSettings.allowDragAndDrop,
				hideLinkList: yaml?.hideLinkList ?? defaultSettings.hideLinkList,
				hideFolderOverview: yaml?.hideFolderOverview ?? defaultSettings.hideFolderOverview,
				useActualLinks: yaml?.useActualLinks ?? defaultSettings.useActualLinks,
				fmtpIntegration: yaml?.fmtpIntegration ?? defaultSettings.fmtpIntegration,
				titleSize: yaml?.titleSize ?? defaultSettings.titleSize,
				isInCallout: yaml?.isInCallout ?? false,
				useWikilinks: yaml?.useWikilinks ?? defaultSettings.useWikilinks ?? true,
			};
		}
		return yaml;
	}

	onOpen(): void {
		const { contentEl } = this;
		this.display(
			contentEl,
			this.yaml,
			this.plugin,
			this.defaultSettings,
			this.display,
			this.el,
			this.ctx,
		);
	}

	display(
		contentEl: HTMLElement,
		yaml: defaultOverviewSettings,
		plugin: FolderOverviewPlugin | FolderNotesPlugin,
		defaultSettings: defaultOverviewSettings,
		display: CallableFunction,
		el?: HTMLElement,
		ctx?: MarkdownPostProcessorContext,
		file?: TFile | null,
		settingsTab?: SettingTab,
		modal?: FolderOverviewSettings,
		changedSection?: string,
	): void {
		modal = this ?? modal;
		contentEl.empty();
		contentEl.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				if (!modal) { return; }
				modal.close();
			}
		});
		if (!modal.defaultSettings) {
			contentEl.createEl('h2', { text: tr('Folder Overview settings') });
		} else {
			contentEl.createEl('h2', { text: tr('Overviews default settings') });
		}

		createOverviewSettings(
			contentEl, yaml, plugin, defaultSettings, display, el, ctx,
			undefined, undefined, modal, changedSection,
		);
	}

	onClose(): void {
		this.plugin.updateOverviewView(this.plugin, this.yaml);
		const { contentEl } = this;
		contentEl.empty();
	}
}
