/* eslint-disable max-len */
import { Setting, Platform } from 'obsidian';
import type { SettingsTab } from './SettingsTab';
import { ListComponent } from '../functions/ListComponent';
import AddSupportedFileModal from '../modals/AddSupportedFileType';
import { FrontMatterTitlePluginHandler } from '../events/FrontMatterTitle';
import ConfirmationModal from './modals/CreateFnForEveryFolder';
import { TemplateSuggest } from '../suggesters/TemplateSuggester';
import { refreshAllFolderStyles } from '../functions/styleFunctions';
import BackupWarningModal from './modals/BackupWarning';
import RenameFolderNotesModal from './modals/RenameFns';
import { tr } from '../i18n';

let debounceTimer: NodeJS.Timeout;

// eslint-disable-next-line complexity
export async function renderGeneral(settingsTab: SettingsTab): Promise<void> {
	const containerEl = settingsTab.settingsPage;
	const nameSetting = new Setting(containerEl)
		.setName(tr('Folder note name template'))
		.setDesc(tr('All folder notes will use this name. Use {{folder_name}} to insert the folder’s name. Existing notes won’t update automatically; click on the button to apply the new name.'))
		.addText((text) =>
			text
				.setValue(settingsTab.plugin.settings.folderNoteName)
				.onChange(async (value) => {
					if (value.trim() === '') { return; }
					settingsTab.plugin.settings.folderNoteName = value;
					await settingsTab.plugin.saveSettings();

					clearTimeout(debounceTimer);
					const FOLDER_NOTE_NAME_DEBOUNCE_MS = 2000;
					debounceTimer = setTimeout(() => {
						if (!value.includes('{{folder_name}}')) {
							if (!settingsTab.showFolderNameInTabTitleSetting) {
								settingsTab.display();
								settingsTab.showFolderNameInTabTitleSetting = true;
							}
						} else if (settingsTab.showFolderNameInTabTitleSetting) {
							settingsTab.display();
							settingsTab.showFolderNameInTabTitleSetting = false;
						}
					}, FOLDER_NOTE_NAME_DEBOUNCE_MS);
				}),
		)
		.addButton((button) =>
			button
				.setButtonText(tr('Rename existing folder notes'))
				.setCta()
				.onClick(async () => {
					new RenameFolderNotesModal(
						settingsTab.plugin,
						tr('Rename all existing folder notes'),
						tr('When you click on "Confirm" all existing folder notes will be renamed to the new folder note name.'),
						settingsTab.renameFolderNotes,
						[],
					).open();
				}),
		);
	nameSetting.infoEl.appendText(tr('Requires a restart to take effect'));
	nameSetting.infoEl.style.color = settingsTab.app.vault.getConfig('accentColor') as string || '#7d5bed';

	if (!settingsTab.plugin.settings.folderNoteName.includes('{{folder_name}}')) {
		new Setting(containerEl)
			.setName(tr('Display Folder Name in Tab Title'))
			.setDesc(tr('Use the actual folder name in the tab title instead of the custom folder note name (e.g., "Folder Note").'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.tabManagerEnabled)
					.onChange(async (value) => {
						if (!value) {
							settingsTab.plugin.tabManager.resetTabs();
						} else {
							settingsTab.plugin.settings.tabManagerEnabled = value;
							settingsTab.plugin.tabManager.updateTabs();
						}
						settingsTab.plugin.settings.tabManagerEnabled = value;
						await settingsTab.plugin.saveSettings();
						settingsTab.display();
					}),
			);
	}

	new Setting(containerEl)
		.setName(tr('Default file type for new folder notes'))
		.setDesc(tr('Choose the default file type (canvas, markdown, ...) used when creating new folder notes.'))
		.addDropdown((dropdown) => {
			dropdown.addOption('.ask', tr('ask for file type'));
			settingsTab.plugin.settings.supportedFileTypes.forEach((type) => {
				if (type === '.md' || type === 'md') {
					dropdown.addOption('.md', tr('Markdown'));
				} else {
					dropdown.addOption('.' + type, type);
				}
			});

			if (
				!settingsTab.plugin.settings.supportedFileTypes.includes(
					settingsTab.plugin.settings.folderNoteType.replace('.', ''),
				) &&
				settingsTab.plugin.settings.folderNoteType !== '.ask'
			) {
				settingsTab.plugin.settings.folderNoteType = '.md';
				settingsTab.plugin.saveSettings();
			}

			let defaultType = settingsTab.plugin.settings.folderNoteType.startsWith('.')
				? settingsTab.plugin.settings.folderNoteType
				: '.' + settingsTab.plugin.settings.folderNoteType;
			if (
				!settingsTab.plugin.settings.supportedFileTypes.includes(
					defaultType.replace('.', ''),
				)
			) {
				defaultType = '.ask';
				settingsTab.plugin.settings.folderNoteType = defaultType;
			}

			dropdown
				.setValue(defaultType)
				.onChange(async (value: '.md' | '.canvas') => {
					settingsTab.plugin.settings.folderNoteType = value;
					settingsTab.plugin.saveSettings();
					settingsTab.display();
				});
		});

	const setting0 = new Setting(containerEl);
	setting0.setName(tr('Supported file types'));
	const desc0 = document.createDocumentFragment();
	desc0.append(
		tr('Specify which file types are allowed as folder notes. Applies to both new and existing folders. Adding many types may affect performance.'),
	);
	setting0.setDesc(desc0);
	const list = new ListComponent(
		setting0.settingEl,
		settingsTab.plugin.settings.supportedFileTypes || [],
		['md', 'canvas'],
	);
	list.on('update', async (values: string[]) => {
		settingsTab.plugin.settings.supportedFileTypes = values;
		await settingsTab.plugin.saveSettings();
		settingsTab.display();
	});

	if (
		!settingsTab.plugin.settings.supportedFileTypes.includes('md') ||
		!settingsTab.plugin.settings.supportedFileTypes.includes('canvas') ||
		!settingsTab.plugin.settings.supportedFileTypes.includes('excalidraw')
	) {
		setting0.addDropdown((dropdown) => {
			const options = [
				{ value: 'md', label: tr('Markdown') },
				{ value: 'canvas', label: tr('Canvas') },
				{ value: 'base', label: tr('Bases') },
				{ value: 'excalidraw', label: tr('Excalidraw') },
				{ value: 'custom', label: tr('Custom extension') },
			];

			options.forEach((option) => {
				if (!settingsTab.plugin.settings.supportedFileTypes?.includes(option.value)) {
					dropdown.addOption(option.value, option.label);
				}
			});
			dropdown.addOption('+', '+');
			dropdown.setValue('+');
			dropdown.onChange(async (value) => {
				if (value === 'custom') {
					return new AddSupportedFileModal(
						settingsTab.app,
						settingsTab.plugin,
						settingsTab,
						list as ListComponent,
					).open();
				}
				await list.addValue(value.toLowerCase());
				settingsTab.display();
				settingsTab.plugin.saveSettings();
			});
		});
	} else {
		setting0.addButton((button) =>
			button
				.setButtonText(tr('Add custom file type'))
				.setCta()
				.onClick(async () => {
					new AddSupportedFileModal(
						settingsTab.app,
						settingsTab.plugin,
						settingsTab,
						list as ListComponent,
					).open();
				}),
		);
	}

	const templateSetting = new Setting(containerEl)
		.setDesc(tr('Can be used with templater/templates plugin. If you add the location of the templates there.'))
		.setName(tr('Template path'))
		.addSearch((cb) => {
			new TemplateSuggest(cb.inputEl, settingsTab.plugin);
			cb.setPlaceholder(tr('Template path'));
			const templateFile = settingsTab.plugin.app.vault.getAbstractFileByPath(
				settingsTab.plugin.settings.templatePath,
			);
			const templateName = templateFile?.name.replace('.md', '') || '';
			cb.setValue(templateName);
			cb.onChange(async (value) => {
				if (value.trim() === '') {
					settingsTab.plugin.settings.templatePath = '';
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}
			});
		});
	templateSetting.infoEl.appendText(tr('Requires a restart to take effect'));
	templateSetting.infoEl.style.color = settingsTab.app.vault.getConfig('accentColor') as string || '#7d5bed';

	const storageLocation = new Setting(containerEl)
		.setName(tr('Storage location'))
		.setDesc(tr('Choose where to store the folder notes'))
		.addDropdown((dropdown) =>
			dropdown
				.addOption('insideFolder', tr('Inside the folder'))
				.addOption('parentFolder', tr('In the parent folder'))
				.setValue(settingsTab.plugin.settings.storageLocation)
				.onChange(async (value: 'insideFolder' | 'parentFolder' | 'vaultFolder') => {
					settingsTab.plugin.settings.storageLocation = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
					refreshAllFolderStyles(undefined, settingsTab.plugin);
				}),
		)
		.addButton((button) =>
			button
				.setButtonText(tr('Switch'))
				.setCta()
				.onClick(async () => {
					let oldStorageLocation = settingsTab.plugin.settings.storageLocation;
					if (settingsTab.plugin.settings.storageLocation === 'parentFolder') {
						oldStorageLocation = 'insideFolder';
					} else if (settingsTab.plugin.settings.storageLocation === 'insideFolder') {
						oldStorageLocation = 'parentFolder';
					}
					new BackupWarningModal(
						settingsTab.plugin,
						tr('Switch storage location'),
						tr('When you click on "Confirm" all folder notes will be moved to the new storage location.'),
						settingsTab.switchStorageLocation,
						[oldStorageLocation],
					).open();
				}),
		);
	storageLocation.infoEl.appendText(tr('Requires a restart to take effect'));
	storageLocation.infoEl.style.color = settingsTab.app.vault.getConfig('accentColor') as string || '#7d5bed';

	if (settingsTab.plugin.settings.storageLocation === 'parentFolder') {
		new Setting(containerEl)
			.setName(tr('Delete folder notes when deleting the folder'))
			.setDesc(tr('Delete the folder note when deleting the folder'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.syncDelete)
					.onChange(async (value) => {
						settingsTab.plugin.settings.syncDelete = value;
						await settingsTab.plugin.saveSettings();
					}),
			);
		new Setting(containerEl)
			.setName(tr('Move folder notes when moving the folder'))
			.setDesc(tr('Move the folder note file along with the folder when it is moved'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.syncMove)
					.onChange(async (value) => {
						settingsTab.plugin.settings.syncMove = value;
						await settingsTab.plugin.saveSettings();
					}),
			);
	}

	if (Platform.isDesktopApp) {
		settingsTab.settingsPage.createEl('h3', { text: tr('Keyboard Shortcuts') });

		new Setting(containerEl)
			.setName(tr('Key for creating folder note'))
			.setDesc(tr('The key combination to create a folder note'))
			.addDropdown((dropdown) => {
				if (!Platform.isMacOS) {
					dropdown.addOption('ctrl', 'Ctrl + Click');
					dropdown.addOption('alt', 'Alt + Click');
				} else {
					dropdown.addOption('ctrl', 'Cmd + Click');
					dropdown.addOption('alt', 'Option + Click');
				}
				dropdown.setValue(settingsTab.plugin.settings.ctrlKey ? 'ctrl' : 'alt');
				dropdown.onChange(async (value) => {
					settingsTab.plugin.settings.ctrlKey = value === 'ctrl';
					settingsTab.plugin.settings.altKey = value === 'alt';
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				});
			});

		new Setting(containerEl)
			.setName(tr('Key for opening folder note'))
			.setDesc(tr('Select the combination to open a folder note'))
			.addDropdown((dropdown) => {
				dropdown.addOption('click', tr('Mouse Click'));
				if (!Platform.isMacOS) {
					dropdown.addOption('ctrl', 'Ctrl + Click');
					dropdown.addOption('alt', 'Alt + Click');
				} else {
					dropdown.addOption('ctrl', 'Cmd + Click');
					dropdown.addOption('alt', 'Option + Click');
				}
				if (settingsTab.plugin.settings.openByClick) {
					dropdown.setValue('click');
				} else if (settingsTab.plugin.settings.openWithCtrl) {
					dropdown.setValue('ctrl');
				} else {
					dropdown.setValue('alt');
				}
				dropdown.onChange(async (value) => {
					settingsTab.plugin.settings.openByClick = value === 'click';
					settingsTab.plugin.settings.openWithCtrl = value === 'ctrl';
					settingsTab.plugin.settings.openWithAlt = value === 'alt';
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				});
			});
	}

	settingsTab.settingsPage.createEl('h3', { text: tr('Folder note behavior') });

	new Setting(containerEl)
		.setName(tr('Confirm folder note deletion'))
		.setDesc(tr('Ask for confirmation before deleting a folder note'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.showDeleteConfirmation)
				.onChange(async (value) => {
					settingsTab.plugin.settings.showDeleteConfirmation = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);

	new Setting(containerEl)
		.setName(tr('Deleted folder notes'))
		.setDesc(tr('What happens to the folder note after you delete it'))
		.addDropdown((dropdown) => {
			dropdown.addOption('trash', tr('Move to system trash'));
			dropdown.addOption('obsidianTrash', tr('Move to Obsidian trash (.trash folder)'));
			dropdown.addOption('delete', tr('Delete permanently'));
			dropdown.setValue(settingsTab.plugin.settings.deleteFilesAction);
			dropdown.onChange(async (value: 'trash' | 'delete' | 'obsidianTrash') => {
				settingsTab.plugin.settings.deleteFilesAction = value;
				await settingsTab.plugin.saveSettings();
				settingsTab.display();
			});
		});

	if (Platform.isDesktop) {
		const setting3 = new Setting(containerEl);
		setting3.setName(tr('Open folder note in a new tab by default'));
		setting3.setDesc(tr('Always open folder notes in a new tab unless the note is already open in the current tab.'));
		setting3.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.openInNewTab)
				.onChange(async (value) => {
					settingsTab.plugin.settings.openInNewTab = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);
		setting3.infoEl.appendText(tr('Requires a restart to take effect'));
		setting3.infoEl.style.color = settingsTab.app.vault.getConfig('accentColor') as string || '#7d5bed';
	}

	if (settingsTab.plugin.settings.openInNewTab) {
		new Setting(containerEl)
			.setName(tr('Focus existing tab instead of creating a new one'))
			.setDesc(tr('If a folder note is already open in a tab, focus that tab instead of creating a new one.'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.focusExistingTab)
					.onChange(async (value) => {
						settingsTab.plugin.settings.focusExistingTab = value;
						await settingsTab.plugin.saveSettings();
						settingsTab.display();
					}),
			);
	}

	new Setting(containerEl)
		.setName(tr('Sync folder name'))
		.setDesc(tr('Automatically rename the folder note when the folder name is changed'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.syncFolderName)
				.onChange(async (value) => {
					settingsTab.plugin.settings.syncFolderName = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);

	settingsTab.settingsPage.createEl('h4', { text: tr('Automation settings') });

	new Setting(containerEl)
		.setName(tr('Create folder notes for all folders'))
		.setDesc(tr('Generate folder notes for every folder in the vault.'))
		.addButton((cb) => {
			cb.setIcon('plus');
			cb.setTooltip(tr('Create folder notes'));
			cb.onClick(async () => {
				new ConfirmationModal(settingsTab.app, settingsTab.plugin).open();
			});
		});

	new Setting(containerEl)
		.setName(tr('Auto-create on folder creation'))
		.setDesc(tr('Automatically create a folder note whenever a new folder is added.'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.autoCreate)
				.onChange(async (value) => {
					settingsTab.plugin.settings.autoCreate = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);

	if (settingsTab.plugin.settings.autoCreate) {
		new Setting(containerEl)
			.setName(tr('Auto-open after creation'))
			.setDesc(tr('Open the folder note immediately after it’s created automatically.'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.autoCreateFocusFiles)
					.onChange(async (value) => {
						settingsTab.plugin.settings.autoCreateFocusFiles = value;
						await settingsTab.plugin.saveSettings();
						settingsTab.display();
					}),
			);

		new Setting(containerEl)
			.setName(tr('Auto-create for attachment folders'))
			.setDesc(tr('Also automatically create folder notes for attachment folders (e.g., "Attachments", "Media", etc.).'))
			.addToggle((toggle) =>
				toggle
					.setValue(settingsTab.plugin.settings.autoCreateForAttachmentFolder)
					.onChange(async (value) => {
						settingsTab.plugin.settings.autoCreateForAttachmentFolder = value;
						await settingsTab.plugin.saveSettings();
						settingsTab.display();
					}),
			);
	}

	new Setting(containerEl)
		.setName(tr('Auto-create when creating notes'))
		.setDesc(tr('Automatically create a folder note when a regular note is created inside a folder. Works for supported file types only.'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.autoCreateForFiles)
				.onChange(async (value) => {
					settingsTab.plugin.settings.autoCreateForFiles = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);

	settingsTab.settingsPage.createEl('h3', { text: tr('Integration & Compatibility') });

	const desc1 = document.createDocumentFragment();
	const link = document.createElement('a');
	link.href = 'https://github.com/snezhig/obsidian-front-matter-title';
	link.textContent = 'front matter title plugin';
	link.target = '_blank';

	desc1.append(
		tr('Allows you to use the '),
		link,
		tr(' with folder notes. It allows you to set the folder name to some name you set in the front matter.'),
	);

	const fmtpSetting = new Setting(containerEl)
		.setName(tr('Enable front matter title plugin integration'))
		.setDesc(desc1)
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.frontMatterTitle.enabled)
				.onChange(async (value) => {
					settingsTab.plugin.settings.frontMatterTitle.enabled = value;
					await settingsTab.plugin.saveSettings();
					if (value) {
						settingsTab.plugin.fmtpHandler =
							new FrontMatterTitlePluginHandler(settingsTab.plugin);
					} else {
						if (settingsTab.plugin.fmtpHandler) {
							settingsTab.plugin.updateAllBreadcrumbs(true);
						}
						settingsTab.plugin.app.vault.getFiles().forEach((file) => {
							settingsTab.plugin.fmtpHandler?.fmptUpdateFileName(
								{
									id: '',
									result: false,
									path: file.path,
									pathOnly: false,
								},
								false,
							);
						});
						settingsTab.plugin.fmtpHandler?.deleteEvent();
						settingsTab.plugin.fmtpHandler =
							new FrontMatterTitlePluginHandler(settingsTab.plugin);
					}
					settingsTab.display();
				}),
		);
	fmtpSetting.infoEl.appendText(tr('Requires a restart to take effect'));
	fmtpSetting.infoEl.style.color = settingsTab.app.vault.getConfig('accentColor') as string || '#7d5bed';

	settingsTab.settingsPage.createEl('h3', { text: tr('Session & Persistence') });

	new Setting(containerEl)
		.setName(tr('Persist tab after restart'))
		.setDesc(tr('Restore the same settings tab after restarting Obsidian.'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.persistentSettingsTab.afterRestart)
				.onChange(async (value) => {
					settingsTab.plugin.settings.persistentSettingsTab.afterRestart = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);

	new Setting(containerEl)
		.setName(tr('Persist tab during session only'))
		.setDesc(tr('Keep the current settings tab open during the session, but reset it after a restart or reload.'))
		.addToggle((toggle) =>
			toggle
				.setValue(settingsTab.plugin.settings.persistentSettingsTab.afterChangingTab)
				.onChange(async (value) => {
					settingsTab.plugin.settings.persistentSettingsTab.afterChangingTab = value;
					await settingsTab.plugin.saveSettings();
					settingsTab.display();
				}),
		);
}
