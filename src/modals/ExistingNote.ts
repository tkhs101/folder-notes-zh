import {
	Modal,
	Setting,
	Platform,
	type App,
	type TFile,
	type TFolder,
	type TAbstractFile,
} from 'obsidian';
import type FolderNotesPlugin from '../main';
import { turnIntoFolderNote } from 'src/functions/folderNoteFunctions';
import { tr } from '../i18n';

export default class ExistingFolderNoteModal extends Modal {
	plugin: FolderNotesPlugin;
	app: App;
	file: TFile;
	folder: TFolder;
	folderNote: TAbstractFile;
	constructor(
		app: App,
		plugin: FolderNotesPlugin,
		file: TFile,
		folder: TFolder,
		folderNote: TAbstractFile,
	) {
		super(app);
		this.plugin = plugin;
		this.app = app;
		this.file = file;
		this.folder = folder;
		this.folderNote = folderNote;
	}
	onOpen(): void {
		const { contentEl } = this;
		contentEl.createEl('h2', { text: tr('A folder note for this folder already exists') });
		const setting = new Setting(contentEl);
		setting.infoEl.createEl('p', {
			text: tr('Are you sure you want to turn the note into a folder note and rename the existing folder note?'),
		});

		setting.infoEl.parentElement?.classList.add('fn-delete-confirmation-modal');
		const buttonContainer = setting.infoEl.createEl('div', { cls: 'fn-delete-confirmation-modal-buttons' });
		if (Platform.isMobileApp) {
			const confirmButton = buttonContainer.createEl('button', {
				text: tr("Rename and don't ask again"),
			});
			confirmButton.classList.add('mod-warning', 'fn-confirmation-modal-button');
			confirmButton.addEventListener('click', async () => {
				this.plugin.settings.showRenameConfirmation = false;
				this.plugin.saveSettings();
				this.close();
				turnIntoFolderNote(this.plugin, this.file, this.folder, this.folderNote, true);
			});
		} else {
			const checkbox = buttonContainer.createEl('input', { type: 'checkbox' });
			checkbox.addEventListener('change', (e) => {
				const target = e.target as HTMLInputElement;
				this.plugin.settings.showRenameConfirmation = !target.checked;
			});
			const checkBoxText = buttonContainer.createEl('span', { text: tr("Don't ask again") });
			checkBoxText.addEventListener('click', () => {
				checkbox.click();
			});
		}
		const button = buttonContainer.createEl('button', { text: tr('Rename') });
		button.classList.add('mod-warning', 'fn-confirmation-modal-button');
		button.addEventListener('click', async () => {
			this.plugin.saveSettings();
			this.close();
			turnIntoFolderNote(this.plugin, this.file, this.folder, this.folderNote, true);
		});
		button.focus();
		const cancelButton = buttonContainer.createEl('button', { text: tr('Cancel') });
		cancelButton.addEventListener('click', async () => {
			this.close();
		});
	}
	onClose(): void {
		const { contentEl } = this;
		contentEl.empty();
	}
}
