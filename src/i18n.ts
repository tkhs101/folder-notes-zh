type TranslationVariables = Record<string, string | number | boolean | null | undefined>;

export const SPECIAL_FOLDER_PATH_PARENT = "File's parent folder path";
export const SPECIAL_FOLDER_PATH_PARENT_LEGACY = 'Fileâ€™s parent folder path';
export const SPECIAL_FOLDER_PATH_LINKED = 'Path of folder linked to the file';

const zh: Record<string, string> = {
	General: '常规',
	'Folder overview': '文件夹概览',
	'Exclude folders': '排除文件夹',
	'File explorer': '文件管理器',
	Path: '路径',
	'Use this file as the folder note for its parent folder': '将当前文件设为其父文件夹的文件夹笔记',
	'Make a folder with this file as its folder note': '创建一个以当前文件为文件夹笔记的文件夹',
	'Create markdown folder note for this folder': '为此文件夹创建 Markdown 文件夹笔记',
	'Create {{type}} folder note for this folder': '为此文件夹创建 {{type}} 文件夹笔记',
	'Create {{type}} folder note for current active folder in file explorer':
		'为文件管理器当前激活的文件夹创建 {{type}} 文件夹笔记',
		'Delete this folder\'s linked note': '删除此文件夹关联的笔记',
	'Delete folder note of current active folder in file explorer':
		'删除文件管理器当前激活文件夹的文件夹笔记',
	'Open this folder\'s linked note': '打开此文件夹关联的笔记',
	'Open folder note of current active folder in file explorer':
		'打开文件管理器当前激活文件夹的文件夹笔记',
	'Create folder note from selection': '从选中文本创建文件夹笔记',
	'Folder already exists': '文件夹已存在',
	'File name cannot contain any of the following characters: * " \\ / < > : | ?':
		'文件名不能包含以下字符：* " \\ / < > : | ?',
	'File name cannot end with a dot': '文件名不能以点号结尾',
	'Folder note already exists': '文件夹笔记已存在',
	'File already exists': '文件已存在',
	'Create folder note': '创建文件夹笔记',
	'Turn into folder note for {{name}}': '转换为 {{name}} 的文件夹笔记',
	'Remove folder from excluded folders': '将文件夹移出排除列表',
	'Successfully removed folder from excluded folders': '已成功将文件夹移出排除列表',
	'Remove folder from detached folders': '将文件夹移出已分离列表',
	'Exclude folder from folder notes': '将文件夹从文件夹笔记中排除',
	'Successfully excluded folder from folder notes': '已成功将文件夹从文件夹笔记中排除',
	'Delete folder note': '删除文件夹笔记',
	'Open folder note': '打开文件夹笔记',
	'Detach folder note': '分离文件夹笔记',
	'Copy Obsidian URL': '复制 Obsidian 链接',
	'Hide folder note in explorer': '在文件管理器中隐藏文件夹笔记',
	'Show folder note in explorer': '在文件管理器中显示文件夹笔记',
	'Folder Note Commands': '文件夹笔记命令',
	'Starting to update folder notes...': '开始更新文件夹笔记……',
	'Finished updating folder notes': '文件夹笔记更新完成',
	'Starting to switch storage location...': '开始切换存储位置……',
	'Finished switching storage location': '存储位置切换完成',
	'Error creating folder overview (folder notes plugin) - check console for more details':
		'创建文件夹概览时出错（Folder Notes 插件），请查看控制台了解详情',
	'Folder note name template': '文件夹笔记名称模板',
	'All folder notes will use this name. Use {{folder_name}} to insert the folder’s name. Existing notes won’t update automatically; click on the button to apply the new name.':
		'所有文件夹笔记都会使用这个名称。使用 {{folder_name}} 插入文件夹名称。已有笔记不会自动更新，请点击按钮应用新名称。',
	'Rename existing folder notes': '重命名现有文件夹笔记',
	'Rename all existing folder notes': '重命名所有现有文件夹笔记',
	'When you click on "Confirm" all existing folder notes will be renamed to the new folder note name.':
		'点击“确认”后，所有现有文件夹笔记都会被重命名为新的文件夹笔记名称。',
	'Requires a restart to take effect': '需要重启后生效',
	'Display Folder Name in Tab Title': '在标签标题中显示文件夹名称',
	'Use the actual folder name in the tab title instead of the custom folder note name (e.g., "Folder Note").':
		'在标签标题中使用实际文件夹名称，而不是自定义的文件夹笔记名称（例如 “Folder Note”）。',
	'Default file type for new folder notes': '新建文件夹笔记的默认文件类型',
	'Choose the default file type (canvas, markdown, ...) used when creating new folder notes.':
		'选择创建新文件夹笔记时使用的默认文件类型（canvas、markdown 等）。',
	'ask for file type': '询问文件类型',
	'Supported file types': '支持的文件类型',
	'Specify which file types are allowed as folder notes. Applies to both new and existing folders. Adding many types may affect performance.':
		'指定哪些文件类型可作为文件夹笔记。对新旧文件夹都生效。添加过多类型可能会影响性能。',
	Markdown: 'Markdown',
	Canvas: 'Canvas',
	Bases: 'Bases',
	Excalidraw: 'Excalidraw',
	'Custom extension': '自定义扩展名',
	'Add custom file type': '添加自定义文件类型',
	'Can be used with templater/templates plugin. If you add the location of the templates there.':
		'可与 Templater/Templates 插件配合使用，在此填写模板所在位置即可。',
	'Template path': '模板路径',
	'Storage location': '存储位置',
	'Choose where to store the folder notes': '选择文件夹笔记的存储位置',
	'Inside the folder': '文件夹内',
	'In the parent folder': '父文件夹中',
	Switch: '切换',
	'Switch storage location': '切换存储位置',
	'When you click on "Confirm" all folder notes will be moved to the new storage location.':
		'点击“确认”后，所有文件夹笔记都会移动到新的存储位置。',
	'Delete folder notes when deleting the folder': '删除文件夹时删除对应的文件夹笔记',
	'Delete the folder note when deleting the folder': '删除文件夹时同时删除文件夹笔记',
	'Move folder notes when moving the folder': '移动文件夹时移动对应的文件夹笔记',
	'Move the folder note file along with the folder when it is moved':
		'移动文件夹时同时移动文件夹笔记文件',
	'Keyboard Shortcuts': '快捷键',
	'Key for creating folder note': '创建文件夹笔记的按键',
	'The key combination to create a folder note': '用于创建文件夹笔记的组合键',
	'Key for opening folder note': '打开文件夹笔记的按键',
	'Select the combination to open a folder note': '选择用于打开文件夹笔记的组合键',
	'Mouse Click': '鼠标点击',
	'Folder note behavior': '文件夹笔记行为',
	'Confirm folder note deletion': '删除文件夹笔记前确认',
	'Ask for confirmation before deleting a folder note': '删除文件夹笔记前先询问确认',
	'Deleted folder notes': '删除文件夹笔记后的处理方式',
	'What happens to the folder note after you delete it': '删除文件夹笔记后如何处理',
	'Move to system trash': '移到系统回收站',
	'Move to Obsidian trash (.trash folder)': '移到 Obsidian 回收站（.trash 文件夹）',
	'Delete permanently': '永久删除',
	'Open folder note in a new tab by default': '默认在新标签页打开文件夹笔记',
	'Always open folder notes in a new tab unless the note is already open in the current tab.':
		'除非该笔记已在当前标签页打开，否则始终在新标签页中打开文件夹笔记。',
	'Focus existing tab instead of creating a new one': '优先聚焦已打开标签页而不是新建标签页',
	'If a folder note is already open in a tab, focus that tab instead of creating a new one.':
		'如果文件夹笔记已经在某个标签页中打开，则切换到该标签页，而不是新建一个。',
	'Sync folder name': '同步文件夹名称',
	'Automatically rename the folder note when the folder name is changed': '文件夹名称变化时自动重命名文件夹笔记',
	'Automation settings': '自动化设置',
	'Create folder notes for all folders': '为所有文件夹创建文件夹笔记',
	'Generate folder notes for every folder in the vault.': '为库中的每个文件夹生成文件夹笔记。',
	'Create folder notes': '创建文件夹笔记',
	'Auto-create on folder creation': '创建文件夹时自动创建',
	'Automatically create a folder note whenever a new folder is added.':
		'每当添加新文件夹时自动创建文件夹笔记。',
	'Auto-open after creation': '创建后自动打开',
	'Open the folder note immediately after it’s created automatically.':
		'自动创建文件夹笔记后立即打开。',
	'Auto-create for attachment folders': '对附件文件夹也自动创建',
	'Also automatically create folder notes for attachment folders (e.g., "Attachments", "Media", etc.).':
		'也为附件文件夹自动创建文件夹笔记（例如 “Attachments”、“Media” 等）。',
	'Auto-create when creating notes': '创建普通笔记时自动创建',
	'Automatically create a folder note when a regular note is created inside a folder. Works for supported file types only.':
		'在文件夹内创建普通笔记时自动创建文件夹笔记。仅适用于受支持的文件类型。',
	'Integration & Compatibility': '集成与兼容性',
	'Allows you to use the ': '允许你将 ',
	' with folder notes. It allows you to set the folder name to some name you set in the front matter.':
		' 与文件夹笔记一起使用。这样你可以把文件夹名称设为 front matter 中指定的名称。',
	'Enable front matter title plugin integration': '启用 Front Matter Title 插件集成',
	'Session & Persistence': '会话与持久化',
	'Persist tab after restart': '重启后保留当前标签',
	'Restore the same settings tab after restarting Obsidian.': '重启 Obsidian 后恢复到同一个设置标签页。',
	'Persist tab during session only': '仅在当前会话中保留标签',
	'Keep the current settings tab open during the session, but reset it after a restart or reload.':
		'在当前会话中保持当前设置标签页打开，但在重启或重新加载后重置。',
	'Hide folder note': '隐藏文件夹笔记',
	'Hide the folder note file from appearing in the file explorer':
		'在文件管理器中隐藏文件夹笔记文件',
	'Disable click-to-open folder note on mobile': '在移动端禁用点击打开文件夹笔记',
	'Prevents folder notes from opening when tapping the folder name or surrounding area on mobile devices. They can now only be opened via the context menu or a command.':
		'在移动设备上点击文件夹名称或其周边区域时，不再打开文件夹笔记。此后只能通过右键菜单或命令打开。',
	'Open folder notes by only clicking directly on the folder name':
		'仅在直接点击文件夹名称时打开文件夹笔记',
	'Only allow folder notes to open when clicking directly on the folder name in the file explorer':
		'只有直接点击文件管理器中的文件夹名称时才允许打开文件夹笔记',
	'Disable folder collapsing': '禁用文件夹折叠',
	'When enabled, folders in the file explorer will only collapse when clicking the collapse icon next to the folder name, not when clicking near a folder name when it has a folder note.':
		'启用后，文件管理器中的文件夹只有在点击名称旁边的折叠图标时才会折叠；当文件夹有文件夹笔记时，点击名称附近不会触发折叠。',
	'Use submenus': '使用子菜单',
	'Use submenus for file/folder commands': '为文件/文件夹命令使用子菜单',
	'Auto update folder name in the file explorer (front matter title plugin only)':
		'自动更新文件管理器中的文件夹名称（仅限 Front Matter Title 插件）',
	'Automatically update the folder name in the file explorer when the front matter title plugin is enabled and the title for a folder note is changed in the front matter. This will not change the file name, only the displayed name in the file explorer.':
		'启用 Front Matter Title 插件后，当文件夹笔记的 front matter 标题发生变化时，自动更新文件管理器中的文件夹名称。不会修改文件名，只会修改显示名称。',
	'Style settings': '样式设置',
	'Highlight folder in the file explorer': '在文件管理器中高亮文件夹',
	'Highlight the folder in the file explorer when it has a folder note and the folder note is open in the editor':
		'当文件夹拥有文件夹笔记且该笔记在编辑器中打开时，在文件管理器中高亮该文件夹',
	'Hide collapse icon': '隐藏折叠图标',
	'Hide the collapse icon in the file explorer next to the name of a folder when a folder only contains a folder note':
		'当文件夹内仅包含文件夹笔记时，在文件管理器中隐藏文件夹名称旁的折叠图标',
	'Hide collapse icon for every empty folder': '为所有空文件夹隐藏折叠图标',
	'Hide the collapse icon in the file explorer next to the name of a folder when a folder is empty':
		'当文件夹为空时，在文件管理器中隐藏文件夹名称旁的折叠图标',
	'Hide collapse icon also when only the attachment folder is in the same folder':
		'当同级仅存在附件文件夹时也隐藏折叠图标',
	'Underline the name of folder notes': '为文件夹笔记名称添加下划线',
	'Add an underline to folders that have a folder note in the file explorer':
		'在文件管理器中为拥有文件夹笔记的文件夹添加下划线',
	'Bold the name of folder notes': '加粗文件夹笔记名称',
	'Make the folder name bold in the file explorer when it has a folder note':
		'在文件管理器中，将拥有文件夹笔记的文件夹名称加粗显示',
	'Cursive the name of folder notes': '将文件夹笔记名称设为斜体',
	'Make the folder name cursive in the file explorer when it has a folder note':
		'在文件管理器中，将拥有文件夹笔记的文件夹名称以斜体显示',
	'Open folder note through path': '通过路径打开文件夹笔记',
	'Open a folder note when clicking on a folder name in the path if it is a folder note':
		'当路径中的文件夹名称对应文件夹笔记时，点击即可打开',
	'Open sidebar when opening a folder note through path (Mobile only)':
		'通过路径打开文件夹笔记时打开侧边栏（仅移动端）',
	'Open the sidebar when opening a folder note through the path on mobile':
		'在移动端通过路径打开文件夹笔记时，自动打开侧边栏',
	'Open sidebar when opening a folder note through path (Desktop only)':
		'通过路径打开文件夹笔记时打开侧边栏（仅桌面端）',
	'Open the sidebar when opening a folder note through the path on desktop':
		'在桌面端通过路径打开文件夹笔记时，自动打开侧边栏',
	'Auto update folder name in the path (front matter title plugin only)':
		'自动更新路径中的文件夹名称（仅限 Front Matter Title 插件）',
	'Automatically update the folder name in the path when the front matter title plugin is enabled and the title for a folder note is changed in the front matter. This will not change the file name, only the displayed name in the path.':
		'启用 Front Matter Title 插件后，当文件夹笔记的 front matter 标题发生变化时，自动更新路径中的文件夹名称。不会修改文件名，只会修改路径中的显示名称。',
	'Underline folders in the path': '为路径中的文件夹添加下划线',
	'Add an underline to folders that have a folder note in the path above a note':
		'在笔记上方路径中，为拥有文件夹笔记的文件夹添加下划线',
	'Bold folders in the path': '加粗路径中的文件夹',
	'Make the folder name bold in the path above a note when it has a folder note':
		'在笔记上方路径中，将拥有文件夹笔记的文件夹名称加粗显示',
	'Cursive the name of folder notes in the path': '将路径中的文件夹笔记名称设为斜体',
	'Make the folder name cursive in the path above a note when it has a folder note':
		'在笔记上方路径中，将拥有文件夹笔记的文件夹名称以斜体显示',
	'Hide folder note name in the path': '在路径中隐藏文件夹笔记名称',
	'Only show the folder name in the path and hide the folder note name.':
		'路径中只显示文件夹名称，隐藏文件夹笔记名称。',
	'Manage excluded folders': '管理排除文件夹',
	'Add {regex} at the beginning of the folder name to use a regex pattern.':
		'在文件夹名称开头添加 {regex} 可使用正则表达式模式。',
	'Use * before and after to exclude folders that include the name between the *s.':
		'在名称前后加上 *，可排除名称中包含该内容的文件夹。',
	'Use * before the folder name to exclude folders that end with the folder name.':
		'在文件夹名称前加 *，可排除以该名称结尾的文件夹。',
	'Use * after the folder name to exclude folders that start with the folder name.':
		'在文件夹名称后加 *，可排除以该名称开头的文件夹。',
	'The regexes and wildcards are only for the folder name, not the path.':
		'正则和通配符仅作用于文件夹名称，不作用于路径。',
	'If you want to switch to a folder path delete the pattern first.':
		'如果你想改为文件夹路径，请先删除当前模式。',
	'Whitelisted folders': '白名单文件夹',
	'Folders that override the excluded folders/patterns': '可覆盖排除文件夹/模式规则的文件夹',
	Manage: '管理',
	'Exclude folder default settings': '排除文件夹默认设置',
	'Exclude pattern default settings': '排除模式默认设置',
	'Add excluded folder': '添加排除文件夹',
	'Edit the default settings for new folder overviews, ': '编辑新建文件夹概览的默认设置，',
	"this won't apply to already existing overviews.": '这不会应用到已经存在的概览。',
	'Extension name': '扩展名',
	'Enter the name of the extension (only the short form, e.g. "md")':
		'输入扩展名（仅短格式，例如 “md”）',
	'This extension is already supported': '该扩展名已受支持',
	'Are you sure you want to delete the folder note \'{{name}}\' ?':
		'确定要删除文件夹笔记 “{{name}}” 吗？',
	'It will be moved to your system trash.': '它将被移到系统回收站。',
	'It will be moved to your Obsidian trash, which is located in the ".trash" hidden folder in your vault.':
		'它将被移到 Obsidian 回收站，也就是库中隐藏的 “.trash” 文件夹。',
	'It will be permanently deleted.': '它将被永久删除。',
	"Don't ask again": '不再询问',
	"Delete and don't ask again": '删除并且不再询问',
	Delete: '删除',
	Cancel: '取消',
	'A folder note for this folder already exists': '该文件夹已经存在文件夹笔记',
	'Are you sure you want to turn the note into a folder note and rename the existing folder note?':
		'确定要将当前笔记转换为文件夹笔记，并重命名已有的文件夹笔记吗？',
	"Rename and don't ask again": '重命名并且不再询问',
	Rename: '重命名',
	'Folder name': '文件夹名称',
	'Enter the name of the folder': '输入文件夹名称',
	'Folder title': '文件夹标题',
	Save: '保存',
	Confirm: '确认',
	'Make sure to backup your vault before using this feature.': '使用此功能前请务必备份你的库。',
	'Create folder note for every folder': '为每个文件夹创建文件夹笔记',
	'This feature will create a folder note for every folder in your vault.':
		'此功能会为你的库中的每个文件夹创建一个文件夹笔记。',
	'Every folder that already has a folder note will be ignored.':
		'已经拥有文件夹笔记的文件夹会被忽略。',
	'Every excluded folder will be ignored.': '所有已排除的文件夹都会被忽略。',
	'Folder note file extension': '文件夹笔记文件扩展名',
	'Choose the file extension for the folder notes.': '选择文件夹笔记使用的文件扩展名。',
	Create: '创建',
	'Please choose a file extension': '请选择一个文件扩展名',
	'Old Folder Note Name': '旧文件夹笔记名称',
	'Every folder note that matches this name will be renamed to the new folder note name.':
		'所有匹配该名称的文件夹笔记都会被重命名为新的文件夹笔记名称。',
	'Enter the old folder note name': '输入旧的文件夹笔记名称',
	'New Folder Note Name': '新文件夹笔记名称',
	'Every folder note that matches the old folder note name will be renamed to this name.':
		'所有匹配旧文件夹笔记名称的文件夹笔记都会被重命名为此名称。',
	'Enter the new folder note name': '输入新的文件夹笔记名称',
	'Excluded folder settings': '排除文件夹设置',
	'Include subfolders': '包含子文件夹',
	'Choose if the subfolders of the folder should also be excluded': '选择是否同时排除此文件夹的子文件夹',
	'Disable folder name sync': '禁用文件夹名称同步',
	'Choose if the folder note should be renamed when the folder name is changed':
		'选择当文件夹名称变化时，是否重命名文件夹笔记',
	"Don't show folder in folder overview": '不在文件夹概览中显示该文件夹',
	'Choose if the folder should be shown in the folder overview': '选择是否在文件夹概览中显示该文件夹',
	'Show folder note in the file explorer': '在文件管理器中显示文件夹笔记',
	'Choose if the folder note should be shown in the file explorer':
		'选择是否在文件管理器中显示文件夹笔记',
	'Disable auto creation of folder notes in this folder': '在此文件夹中禁用自动创建文件夹笔记',
	'Choose if a folder note should be created when a new folder is created':
		'选择在创建新文件夹时是否创建文件夹笔记',
	'Disable open folder note': '禁用打开文件夹笔记',
	'Choose if the folder note should be opened when the folder is opened':
		'选择打开文件夹时是否打开对应的文件夹笔记',
	'Collapse folder when opening folder note': '打开文件夹笔记时折叠文件夹',
	'Choose if the folder should be collapsed when the folder note is opened':
		'选择打开文件夹笔记时是否折叠文件夹',
	'Pattern settings': '模式设置',
	'Choose if the folder name should be renamed when the file name has been changed':
		'选择文件名变化时是否重命名文件夹名称',
	'Choose if a folder note should be created when a new folder is created that matches this pattern':
		'选择创建的新文件夹匹配此模式时是否自动创建文件夹笔记',
	'Whitelisted folder settings': '白名单文件夹设置',
	'Choose if the subfolders of the folder should also be whitelisted':
		'选择是否同时将此文件夹的子文件夹加入白名单',
	'Enable folder name sync': '启用文件夹名称同步',
	'Choose if the name of a folder note should be renamed when the folder name is changed':
		'选择当文件夹名称变化时是否重命名文件夹笔记名称',
	'Show folder in folder overview': '在文件夹概览中显示文件夹',
	'Hide folder note in file explorer': '在文件管理器中隐藏文件夹笔记',
	'Choose if the folder note should be hidden in the file explorer':
		'选择是否在文件管理器中隐藏文件夹笔记',
	'Allow auto creation of folder notes in this folder': '允许在此文件夹中自动创建文件夹笔记',
	'Open folder note when clicking on the folder': '点击文件夹时打开文件夹笔记',
	'Choose if the folder note should be opened when you click on the folder':
		'选择点击文件夹时是否打开对应的文件夹笔记',
	"Don't collapse folder when opening folder note": '打开文件夹笔记时不要折叠文件夹',
	'Whitelisted pattern settings': '白名单模式设置',
	'Manage whitelisted folders': '管理白名单文件夹',
	'Add whitelisted folder': '添加白名单文件夹',
	'Folder path': '文件夹路径',
	Pattern: '模式',
	'Edit folder note': '编辑文件夹笔记',
	'Move up': '上移',
	'Move down': '下移',
	'Delete excluded folder': '删除排除文件夹',
	'Edit pattern': '编辑模式',
	'Delete pattern': '删除模式',
	'A folder with the same name already exists': '已存在同名文件夹',
	'Edit folder overview': '编辑文件夹概览',
	'Insert folder overview': '插入文件夹概览',
	'You can edit the overview using the "Edit folder overview" command from the command palette. To find more about folder overview, check the plugin documentation: ':
		'你可以通过命令面板中的“编辑文件夹概览”命令来修改概览。想了解更多文件夹概览信息，请查看插件文档：',
	'Folder Overview settings': '文件夹概览设置',
	'Select overview': '选择概览',
	Default: '默认',
	'Global settings': '全局设置',
	'Auto-update links without opening the overview': '无需打开概览也自动更新链接',
	'If enabled, the links that appear in the graph view will be updated even when you don\'t have the overview open somewhere.':
		'启用后，即使没有打开任何文件夹概览，图谱视图中出现的链接也会自动更新。',
	'Overviews default settings': '概览默认设置',
	'Auto sync': '自动同步',
	'Choose if the overview should automatically update when you delete, create or rename a file/folder':
		'选择在删除、创建或重命名文件/文件夹时是否自动更新概览',
	'Allow drag and drop': '允许拖放',
	'Choose if you want to allow drag and drop in the overview': '选择是否允许在概览中进行拖放',
	'Show the title': '显示标题',
	'Choose if the title above the folder overview should be shown': '选择是否显示文件夹概览上方的标题',
	Title: '标题',
	'Find more information about the title in the documentation. There is also a list of variables you can use':
		'在文档中查看有关标题的更多信息，里面还有可用变量列表',
	'Title size': '标题大小',
	'The larger the number, the smaller the title will be displayed.':
		'数字越大，标题显示得越小。',
	'Folder path for the overview': '概览对应的文件夹路径',
	'The overview will show the subfolders and files of the folder you choose here. ':
		'概览会显示你在这里选择的文件夹中的子文件夹和文件。',
	'Find more information about this setting in the documentation.':
		'在文档中查看此设置的更多信息。',
	'Use actual links': '使用真实链接',
	'Choose if the links in the overview should be showed in the graph view. This requires a second list under the actual overview and which is hidden by default.':
		'选择概览中的链接是否应显示在图谱视图中。这需要在概览下方生成第二个列表，默认会被隐藏。',
	'Use wikilinks': '使用维基链接',
	'Choose if the links in the link list should be in wikilink format or markdown link format (e.g., [[link]] vs [link](url)).':
		'选择链接列表中的链接使用维基链接格式还是 Markdown 链接格式（例如 `[[link]]` 与 `[link](url)`）。',
	'Hide folder overview': '隐藏文件夹概览',
	'Choose if the folder overview should be hidden and instead only the link list should be shown':
		'选择是否隐藏文件夹概览，仅显示链接列表',
	'Hide link list': '隐藏链接列表',
	'Choose if only link list under the folder overview should be shown':
		'选择是否只显示文件夹概览下方的链接列表',
	'Overview style': '概览样式',
	'Choose the style of the overview (grid style soon)': '选择概览样式（网格样式即将支持）',
	List: '列表',
	Explorer: '资源管理器',
	'Include types': '包含类型',
	Folder: '文件夹',
	PDF: 'PDF',
	Image: '图片',
	Audio: '音频',
	Video: '视频',
	'All other file types': '其他所有文件类型',
	'All file types': '所有文件类型',
	'Disable file tag': '禁用文件标签',
	'Choose if the file tag should be shown after the file name': '选择是否在文件名后显示文件标签',
	'Show folder notes': '显示文件夹笔记',
	'Choose if folder notes (the note itself and not the folder name) should be shown in the overview':
		'选择是否在概览中显示文件夹笔记本身（而不是文件夹名称）',
	'File depth': '文件深度',
	'File & folder = +1 depth': '文件或文件夹都算作 +1 层深度',
	'Sort files by': '文件排序方式',
	'Choose how the files should be sorted': '选择文件的排序方式',
	Name: '名称',
	Created: '创建时间',
	Modified: '修改时间',
	Descending: '降序',
	Ascending: '升序',
	'Show folder names of folders that appear empty in the folder overview':
		'显示在文件夹概览中看起来为空的文件夹名称',
	'Show the names of folders that appear to have no files/folders in the folder overview. That\'s mostly the case when you set the file depth to 1.':
		'显示在文件夹概览中看起来没有文件/子文件夹的文件夹名称。这种情况通常出现在文件深度设置为 1 时。',
	'Only show empty folders which are on the first level of the folder overview':
		'仅显示文件夹概览第一层中的空文件夹',
	'Disable collapse icon for folder notes': '禁用文件夹笔记的折叠图标',
	'Remove the collapse icon next to the folder name for folder notes when they only contain the folder note itself':
		'当文件夹只包含文件夹笔记本身时，移除文件夹名称旁的折叠图标',
	'Store collapsed condition': '保存折叠状态',
	'Choose if the collapsed condition should be stored until you restart Obsidian':
		'选择是否将折叠状态保存到 Obsidian 重启前',
	'Collapse all in the tree by default': '默认折叠树中的所有内容',
	'Collapse every folder in the file explorer in the overview by default':
		'默认折叠概览中文件管理器树的所有文件夹',
	'Front Matter Title Plugin integration': 'Front Matter Title 插件集成',
	'Replace the folder/file name with the title from the Front Matter Title Plugin. This requires the plugin to be installed and enabled.':
		'用 Front Matter Title 插件中的标题替换文件夹/文件名称。此功能要求该插件已安装并启用。',
	"Folder overview: Couldn't find the folder": '文件夹概览：找不到该文件夹',
	'Edit overview': '编辑概览',
	'Indexing files for folder overview plugin...': '正在为文件夹概览插件建立文件索引……',
	'Indexed files for folder overview plugin.': '文件夹概览插件的文件索引已完成。',
	"File's parent folder path": '当前文件的父文件夹路径',
	'Path of folder linked to the file': '与当前文件关联的文件夹路径',
	Vault: '库',
};

function getLocale(): string {
	const htmlLocale = document?.documentElement?.lang;
	const localStorageLocale = window?.localStorage?.getItem('language')
		?? window?.localStorage?.getItem('locale');
	return (localStorageLocale || htmlLocale || navigator.language || 'en').toLowerCase();
}

export function isZhLocale(): boolean {
	return getLocale().startsWith('zh');
}

export function tr(text: string, variables?: TranslationVariables): string {
	const template = isZhLocale() ? zh[text] ?? text : text;
	if (!variables) {
		return template;
	}
	return template.replace(/\{\{(.*?)\}\}/g, (_, key: string) => {
		const value = variables[key.trim()];
		return value === undefined || value === null ? '' : String(value);
	});
}

export function normalizeSpecialFolderPath(value: string): string {
	if (
		value === SPECIAL_FOLDER_PATH_PARENT
		|| value === SPECIAL_FOLDER_PATH_PARENT_LEGACY
		|| value === tr(SPECIAL_FOLDER_PATH_PARENT)
	) {
		return SPECIAL_FOLDER_PATH_PARENT;
	}
	if (value === SPECIAL_FOLDER_PATH_LINKED || value === tr(SPECIAL_FOLDER_PATH_LINKED)) {
		return SPECIAL_FOLDER_PATH_LINKED;
	}
	return value;
}

export function displayFolderPathOption(value: string): string {
	const normalized = normalizeSpecialFolderPath(value);
	if (normalized === SPECIAL_FOLDER_PATH_PARENT) {
		return tr(SPECIAL_FOLDER_PATH_PARENT);
	}
	if (normalized === SPECIAL_FOLDER_PATH_LINKED) {
		return tr(SPECIAL_FOLDER_PATH_LINKED);
	}
	return value;
}
