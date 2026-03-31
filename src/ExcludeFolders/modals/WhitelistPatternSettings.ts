import { Modal, Setting, type App } from 'obsidian';
import type FolderNotesPlugin from '../../main';
import type { WhitelistedPattern } from '../WhitelistPattern';
import { tr } from '../../i18n';

export default class WhitelistPatternSettings extends Modal {
	plugin: FolderNotesPlugin;
	app: App;
	pattern: WhitelistedPattern;
	constructor(app: App, plugin: FolderNotesPlugin, pattern: WhitelistedPattern) {
		super(app);
		this.plugin = plugin;
		this.app = app;
		this.pattern = pattern;
	}

	onOpen(): void {
		this.display();
	}

	display(): void {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.createEl('h2', { text: tr('Whitelisted pattern settings') });
		new Setting(contentEl)
			.setName(tr('Enable folder name sync'))
			.setDesc(tr('Choose if the name of a folder note should be renamed when the folder name is changed'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.pattern.enableSync)
					.onChange(async (value) => {
						this.pattern.enableSync = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(contentEl)
			.setName(tr('Allow auto creation of folder notes in this folder'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.pattern.enableAutoCreate)
					.onChange(async (value) => {
						this.pattern.enableAutoCreate = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(contentEl)
			.setName(tr('Show folder in folder overview'))
			.setDesc(tr('Choose if the folder should be shown in the folder overview'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.pattern.showInFolderOverview)
					.onChange(async (value) => {
						this.pattern.showInFolderOverview = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(contentEl)
			.setName(tr('Open folder note when clicking on the folder'))
			.setDesc(tr('Choose if the folder note should be opened when you click on the folder'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.pattern.enableFolderNote)
					.onChange(async (value) => {
						this.pattern.enableFolderNote = value;
						await this.plugin.saveSettings(true);
						this.display();
					}),
			);

		if (this.pattern.enableFolderNote) {
			new Setting(contentEl)
				.setName(tr("Don't collapse folder when opening folder note"))
				.setDesc(tr('Choose if the folder should be collapsed when the folder note is opened'))
				.addToggle((toggle) =>
					toggle
						.setValue(this.pattern.disableCollapsing)
						.onChange(async (value) => {
							this.pattern.disableCollapsing = value;
							await this.plugin.saveSettings();
						}),
				);
		}
	}

	onClose(): void {
		const { contentEl } = this;
		contentEl.empty();
	}
}
