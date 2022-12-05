# Hello visitor

You're looking on my training project. I wanted to create one, to prove myself that I can create something big and a bit more serious than banal and boring TODO lists. The idea was - to challenge myself and implement something hard, and complex(as I feel at the moment). I'm talking about animations, various interesting components such a masonry layout (which on the main page when you passed auth).
I decided to clone part of Pinterest functionality.
### Related repos
- Faketerest - NextJS/Redux/Tailwind/Jest/Enzyme/PostgreSQL
- [Faketerest Pager](https://github.com/fake364/faketerest-pager) Notifications/Messages server (Socket IO/ Redis)
- [Faketerest Utilities](https://github.com/fake364/faketerest-utilities) Utility package for common utils, constants and types

### Functionality/Roadmap

- [x] Session authentication
  - [x] Login
  - [x] Registration
- [x] Subscribers (not added everywhere in the code atm)
- [x] Post creation
  - [x] Comment
  - [x] Beautiful page with posibility to upload multiple images(Desktop only)
- [x] Mobile version(Except Post builder page)
- [x] Settings
  - [x] Avatar change
  - [x] username
  - [x] First/Last name
  - [x] Password
  - [x] email
  - [x] Age
  - [ ] TBD
- [x] Notifications
  - [x] Subscription added post
  - [x] Commented your post
  - [x] Message recieved
  - [x] Someone subscribed to you
  - [x] Sound on notification recieved
  - [ ] TBD
- [x] Conversations
  - [x] Users search
  - [x] Inbox with existing dialogs
  - [x] Read/Unread messages
  - [ ] Multiple participants
- [x] Translations
  - [x] English
  - [ ] Russian
- [x] User profile
  - [x] All posts board
  - [ ] Saved board
  - [ ] Custom board

### Installation

1. Setup configuration
Create .env file with appropriate enviironment variables
```
docker-compose up
```
