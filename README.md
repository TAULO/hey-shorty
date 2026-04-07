# <\HeyShorty \/\>
A Global Search shortcut interface designed to be implemented for any frontend framework

# Demo
https://github.com/user-attachments/assets/d1492070-de0f-4bdd-866a-4b8f87ba4a1f

# Installation with NPM
```
npm install @taulo1999/heyshorty
```
# Usage
Add `HeyShorty` tag to your HTML
```html
<hey-shorty> <hey-shorty/>
```

Add data to `HeyShorty`

```js
 const data = [{
         id: 'Home',
         name: 'Go to Home',
         hotkeys: ['cmd', 'h'],
         icon: 'home',
         searchKeywords: ['dashboard', 'start', 'main'],
         handler: () => console.log('navigate → home'),
     },
     {
         id: 'Projects',
         name: 'Go to Projects',
         hotkeys: ['cmd', 'p'],
         icon: 'apps',
         searchKeywords: ['workspace', 'boards'],
         handler: () => console.log('navigate → projects'),
     },
     {
         id: 'Settings',
         name: 'Go to Settings',
         hotkeys: ['cmd', ','],
         icon: 'settings',
         handler: () => console.log('navigate → settings'),
     },
     {
         id: 'Notifications',
         name: 'Go to Notifications',
         hotkeys: ['cmd', 'n'],
         icon: 'notifications',
         searchKeywords: ['alerts', 'inbox', 'bell'],
         handler: () => console.log('navigate → notifications'),
     },
     {
         id: 'Theme',
         name: 'Change Theme…',
         icon: 'palette',
         searchKeywords: ['appearance', 'color', 'mode'],
         children: [{
                 id: 'theme-light',
                 name: 'Light',
                 icon: 'light_mode',
                 hotkeys: ['cmd', 'shift', 'l'],
                 handler: () => lightTheme(),
             },
             {
                 id: 'theme-dark',
                 name: 'Dark',
                 icon: 'dark_mode',
                 hotkeys: ['cmd', 'shift', 'd'],
                 handler: () => darkTheme(),
             },
             {
                 id: 'theme-system',
                 name: 'System Default',
                 icon: 'desktop_windows',
                 handler: () => console.log('theme → system'),
             },
         ],
     },
 ];

 const shorty = document.querySelector('hey-shorty');
 shorty.data = data;
```
# Attributes
TODO

# Item
TODO

# Events
TODO

# CSS variables
TODO


