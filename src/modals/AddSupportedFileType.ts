import { Modal, Setting, Notice, type App, type SettingTab } from 'obsidian';
import type FolderNotesPlugin from '../main';
import type { ListComponent } from 'src/functions/ListComponent';
import { tr } from '../i18n';

export default class AddSupportedFileModal extends Modal {
	plugin: FolderNotesPlugin;
	app: App;
	name: string;
	list: ListComponent;
	settingsTab: SettingTab;
	constructor(app: App, plugin: FolderNotesPlugin, settingsTab: SettingTab, list: ListComponent) {
		super(app);
		this.plugin = plugin;
		this.app = app;
		this.name = '';
		this.list = list;
		this.settingsTab = settingsTab;
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				this.close();
			}
		});
		contentEl.createEl('h2', { text: tr('Extension name') });
		new Setting(contentEl)
			.setName(tr('Enter the name of the extension (only the short form, e.g. "md")'))
			.addText((text) =>
				text
					.setValue('')
					.onChange(async (value) => {
						if (value.trim() !== '') {
							this.name = value.trim();
						}
					}),
			);
	}
	async onClose(): Promise<void> {
		if (this.name.toLocaleLowerCase() === 'markdown') {
			this.name = 'md';
		}
		const { contentEl } = this;
		if (this.name === '') {
			contentEl.empty();
			this.settingsTab.display();
		} else if (this.plugin.settings.supportedFileTypes.includes(this.name.toLowerCase())) {
			new Notice(tr('This extension is already supported'));
		} else {
			await this.list.addValue(this.name.toLowerCase());
			this.settingsTab.display();
			this.plugin.saveSettings();
			contentEl.empty();
		}
	}
}
