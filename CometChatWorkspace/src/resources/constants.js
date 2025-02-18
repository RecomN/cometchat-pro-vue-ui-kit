export const DEFAULT_STRING_PROP = {
  type: String,
  default: "",
  required: false,
};

export const DEFAULT_OBJECT_PROP = {
  type: Object,
  required: false,
  default: function () {
    return {};
  },
};

export const DEFAULT_BOOLEAN_PROP = {
  type: Boolean,
  required: false,
  default: false,
};

export const DEFAULT_NUMBER_PROP = {
  type: Number,
  required: false,
  default: 0,
};

export const DEFAULT_ARRAY_PROP = {
  type: Array,
  required: false,
  default: function () {
    return [];
  },
};

export const COMETCHAT_CONSTANTS = {
  NO_ITEM_SELECTED_MESSAGE: "Pilih pesan di samping untuk mulai chat",
  NO_TAB_SELECTED_MESSAGE: "Switch tabs to start messaging",
  LOADING_MESSSAGE: "Loading...",
  ADDING_MESSSAGE: "Adding...",
  CREATING_MESSSAGE: "Creating...",
  SEARCH_LOADING: "Searching...",
  ERROR_LOADING_USERS: "Error in loading users",
  ERROR_LOADING_CHATS: "Error in loading chats",
  ERROR_COMETCHAT_LOGIN: "Log in error, reload",
  ERROR_NO_USERS_FOUND: "No users found",
  ERROR_NO_RECORDS: "No records found",
  EMPTY_STRING: "",
  SINGLE_SPACE: " ",
  USERS: "Users",
  CHATS: "Chats",
  GROUPS: "Groups",
  CONTACTS: "Contacts",
  AVATAR: "Avatar",
  MORE: "More",
  MEDIA_ITEM: "Media Item",
  MESSAGE_IMAGE: "📷 Image",
  MESSAGE_FILE: "📁 File",
  MESSAGE_VIDEO: "📹 Video",
  MESSAGE_AUDIO: "🎵 Audio",
  CUSTOM_MESSAGE: "You have a message",
  MISSED_VOICE_CALL: "Missed voice call",
  MISSED_AUDIO_CALL: "Missed audio call",
  MISSED_VIDEO_CALL: "Missed video call",
  CUSTOM_MESSAGE_POLL: "📊 Poll",
  CUSTOM_MESSAGE_STICKER: "💟 Sticker",
  CUSTOM_MESSAGE_DOCUMENT: "📃 Document",
  CUSTOM_MESSAGE_WHITEBOARD: "📝 Whiteboard",
  ONLINE: "Online",
  ADMINISTRATOR: "Administrator",
  MODERATOR: "Moderator",
  PARTICIPANT: "Participant",
  PUBLIC: "Public",
  PRIVATE: "Private",
  PASSWORD_PROTECTED: "Password Protected",
  PRIVACY_AND_SECURITY: "Privacy and Security",
  PREFERENCES: "Preferences",
  MEMBERS: "Members",
  TODAY: "Today",
  YESTERDAY: "Yesterday",
  TYPING: "typing...",
  IS_TYPING: "is typing...",
  LAST_ACTIVE_AT: "Last active at: ",
  CLOSE: "Close",
  ENTER_GROUP_NAME: "Enter group name",
  ADD_MEMBERS: "Add Members",
  SEND_MESSAGE: "Send Message",
  UNBLOCK_USER: "Unblock User",
  BLOCK_USER: "Block User",
  DELETE_AND_EXIT: "Delete and Exit",
  LEAVE_GROUP: "Leave Group",
  CREATE_GROUP: "Create Group",
  SHARED_MEDIA: "Shared Media",
  VIDEO_CALL: "Video call",
  AUDIO_CALL: "Audio call",
  LOADING: "Loading...",
  REPLY: "reply",
  REPLIES: "replies",
  LAUNCH: "Launch",
  SHARED_COLLABORATIVE_DOCUMENT: "has shared a collaborative document",
  SHARED_COLLABORATIVE_WHITEBOARD: "has shared a collaborative whiteboard",
  CREATED_WHITEBOARD: "You’ve created a new collaborative whiteboard",
  CREATED_DOCUMENT: "You’ve created a new collaborative document",
  PHOTOS: "Photos",
  VIDEOS: "Videos",
  DOCUMENT: "Document",
  YOU_DELETED_THIS_MESSAGE: "⚠️ You deleted this message",
  THIS_MESSAGE_DELETED: "⚠️ This message was deleted",
  RECEIVER_DELETED_MESSAGE: "This message was deleted.",
  SENDER_DELETED_MESSAGE: "You deleted this message.",
  VIEW_ON_YOUTUBE: "View on Youtube",
  SEARCH: "Search",
  NO_USERS_FOUND: "No users found",
  ERROR: "Error",
  NO_GROUPS_FOUND: "No groups found",
  // NO_CHATS_FOUND: "No chats found",
  NO_CHATS_FOUND: "Belum Ada Chat",
  MEDIA_MESSAGE: "Media message",
  INCOMING_AUDIO_CALL: "Incoming audio call",
  INCOMING_VIDEO_CALL: "Incoming video call",
  DECLINE: "Decline",
  ACCEPT: "Accept",
  CALL_INITIATED: "Call initiated",
  OUTGOING_AUDIO_CALL: "Outgoing audio call",
  OUTGOING_VIDEO_CALL: "Outgoing video call",
  CALL_REJECTED: "Call rejected",
  REJECTED_CALL: "rejected call",
  CALL_ACCEPTED: "Call accepted",
  JOINED: "joined",
  LEFT_THE_CALL: "left the call",
  CALL_UNANSWERED: "Call unanswered",
  UNANSWERED_AUDIO_CALL: "Unanswered audio call",
  UNANSWERED_VIDEO_CALL: "Unanswered video call",
  CALL_ENDED: "Call ended",
  CALL_CANCELLED: "Call cancelled",
  CALL_BUSY: "Call busy",
  CALLING: "Calling...",
  ADD: "Add",
  LOCK: "Lock",
  SHIELD: "Shield",
  FULL_SCREEN_VIEW: "Full Screen View",
  NO_BANNED_MEMBERS_FOUND: "No banned members found",
  BANNED_MEMBERS: "Banned Members",
  NAME: "Name",
  SCOPE: "Scope",
  UNBAN: "Unban",
  SELECT_GROUP_TYPE: "Select group type",
  ENTER_GROUP_PASSWORD: "Enter group password",
  CREATE: "Create",
  CREATE_POLL: "Create Poll",
  QUESTION: "Question",
  ENTER_YOUR_QUESTION: "Enter your question",
  OPTIONS: "Options",
  ENTER_YOUR_OPTION: "Enter your option",
  ADD_NEW_OPTION: "Add new option",
  VIEW_MEMBERS: "View Members",
  VIEW: "View",
  DETAILS: "Details",
  NOTIFICATIONS: "Notifications",
  OTHER: "Other",
  HELP: "Help",
  REPORT_PROBLEM: "Report a Problem",
  GROUP_MEMBERS: "Group Members",
  BAN: "Ban",
  KICK: "Kick",
  CHANGE_SCOPE: "Change Scope",
  INSERT_STICKER: "Insert Sticker",
  PICK_YOUR_EMOJI: "Pick your emoji",
  PRIVATE_GROUP: "Private Group",
  PROTECTED_GROUP: "Protected Group",
  VISIT: "Visit",
  ATTACH: "Attach",
  ATTACH_FILE: "Attach file",
  ATTACH_VIDEO: "Attach video",
  ATTACH_AUDIO: "Attach audio",
  ATTACH_IMAGE: "Attach image",
  COLLABORATE_USING_DOCUMENT: "Collaborate using a document",
  COLLABORATE_USING_WHITEBOARD: "Collaborate using a whiteboard",
  EMOJI: "Emoji",
  ENTER_YOUR_MESSAGE_HERE: "Enter your message here",
  NO_MESSAGES_FOUND: "No messages found",
  THREAD: "Thread",
  COLLABORATIVE_DOCUMENT: "Collaborative Document",
  COLLABORATIVE_WHITEBOARD: "Collaborative Whiteboard",
  ADD_REACTION: "Add reaction",
  STICKER: "Sticker",
  STICKERS: "Stickers",
  INSERT_EMOTICON: "Insert Emoticon",
  NO_STICKERS_FOUND: "No stickers found",
  REPLY_TO_THREAD: "Reply to thread",
  REPLY_IN_THREAD: "Reply in thread",
  DELETE_MESSAGE: "Delete message",
  EDIT_MESSAGE: "Edit message",
  SUNDAY: "SUNDAY",
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
  GROUP_NAME_BLANK: "Group name cannot be blank",
  GROUP_TYPE_BLANK: "Group type cannot be blank",
  GROUP_PASSWORD_BLANK: "Group password cannot be blank",
  POLL_QUESTION_BLANK: "Question cannot be blank",
  POLL_OPTION_BLANK: "Option cannot be blank",
  POLL_CREATE_ERROR: "Error creating poll",
  OWNER: "Owner",
  CALLS: "Calls",
  CUSTOM_MESSAGE_LOCATION: "📍Location",
  OFFLINE: "Offline",
  YOU: "You",
  PRIVACY: "Privacy",
  BLOCKED_USERS: "Blocked Users",
  "YOU'VE_BLOCKED": "You've blocked",
  NO_PHOTOS: "No Photos",
  NO_VIDEOS: "No Videos",
  NO_DOCUMENTS: "No Documents",
  JOIN: "Join",
  BLOCKED_USER: "You have blocked this user",
  BLOCKED_DESCRIPTION:
    "To start a conversation, click on the icon at the top right corner and unblock the user",
  DELETE_CONFIRMATION: "Are you sure you want to delete?",
  DELETE: "DELETE",
  CANCEL: "CANCEL",
};
