# TODOS

Explore having the text on buttons coloured rather than the buttons themselves

Formatting on the update display

Ability to save URL and URL sections to local storage

Ability to retrieve URL sections and the complete URL broken down into sections

## Item states in List

There are several variables used to indicate the status of List item that help to manage CSS, text and actions of the item panel and the buttons:

- **isFocussed** means the currently selected item. This is derived state where the first display property (id, \_id or index) is the same as the idParam state value. This is mainly used to derive the classes given to the panel and buttons for CSS styling.
- **viewActive**, **updateActive** and **deleteActive** mean that the item is the focussed item AND the operation is 'getById', 'update' or 'delete' respectively - this is used to derive the text of the corresponding button and directs the behaviour when this button is clicked.

# How to build a simple Todo CRUD client app with Vite React TypeScript

This repository is a dual app/guide to create a simple CRUD client for a Todo app. It is designed to be a basic UI client for a partner Todo API but the principles are the same for any CRUD client. Its primary use intention is as a guide to creating the client and an explanation of the steps and so for the sake of brevity, please see [about this repository](howTo/7c_misc_aboutThisRepo.md) for more detail, or [running this app]() for info on how to actually run the included client app. Otherwise, the following chapters are for building your own client app.

## Contents

### Setup - React app, prettier, scripts

1. [Set up the React and the repository](howTo/1a_setUp_createReactProject.md)
2. [Set up Prettier](howTo/1b_setUp_prettier.md)
