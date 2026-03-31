import BackupWarningModal from './BackupWarning';
import type FolderNotesPlugin from 'src/main';
import { Setting } from 'obsidian';
import { tr } from '../../i18n';

export default class RenameFolderNotesModal extends BackupWarningModal {
	constructor(
		plugin: FolderNotesPlugin,
		title: string,
		description: string,
		callback: (...args: unknown[]) => void,
		args: unknown[] = [],
	) {
		super(plugin, title, description, callback, args);
	}

	insertCustomHtml(): void {
		const { contentEl } = this;
		new Setting(contentEl)
			.setName(tr('Old Folder Note Name'))
			.setDesc(tr('Every folder note that matches this name will be renamed to the new folder note name.'))
			.addText((text) => text
				.setPlaceholder(tr('Enter the old folder note name'))
				.setValue(this.plugin.settings.oldFolderNoteName || '')
				.onChange(async (value) => {
					this.plugin.settings.oldFolderNoteName = value;
				}),
			);

		new Setting(contentEl)
			.setName(tr('New Folder Note Name'))
			.setDesc(tr('Every folder note that matches the old folder note name will be renamed to this name.'))
			.addText((text) => text
				.setPlaceholder(tr('Enter the new folder note name'))
				.setValue(this.plugin.settings.folderNoteName || '')
				.onChange(async (value) => {
					this.plugin.settings.folderNoteName = value;
					this.plugin.settingsTab.display();
				}),
			);
	}
}
