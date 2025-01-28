Welcome to Mau Tasks App

This project is a list task

This is a project with Ionic-Angular

version angular 19.1.14

node version >= 20

ionic version 7.2.0

github repo link: https://github.com/Mauro-devhub/mautasksapp

app: https://mautasksapp.vercel.app/home

step for install

1- clone this repository: git clone https://github.com/Mauro-devhub/mautasksapp.git

2- switch branch main

3- npm i

**run web app**

4- run command on directory mautasksapp: npm run start

5- browser - http://localhost:4200/home

**run on ios**

- you need install xcode

- run command on directory mautasksapp: ionic cap build ios

ionic build for ios and will open xcode automatically you need to select a device and click on start to show the app runnin on ios device

**run on android**

- you need install android studio

- run command on directory mautasksapp: ionic cap build android

ionic build for android and will open android studio automatically you need wait for all process finish, once done select a device and click on start

How work Mau Tasks App

**1- Create a task**

- Click on menu header top right

- You will see a menu with option [ create task ] for the moment user watch 1 option cause not have tasks on list

- The app take the user to the page create task the user have to complete all validations on formulary

- Once done, the user will see a list on main page home with tasks

**2- Update task the user have few options to update a task**

- option 1

  - Click on menu header top right

  - User will see few options such as [Create task, Edit task, Remove task] click on Edit task

  - User will see icons o items list and another icon on top left menu
  
  - If user click on icon top left the action to edit a task will be deselected

  - If user click on icon edit items, the app take the user to the page edit a task, the user have to complete all validations on formulary

  - Click on button update from formulary, the task will be updated and the user can select the task on list to see details task updated

- option 2

  - Click on menu item

  - You will see an option to update the state task fast

  - IMPORTANT

  - The user can't update a task if the task have expired, task change state expired automatically if the user not have done the task, when a task have expired can't be     
    edited, the user just have 2 options see details of the task or delete the task.
    
**3- Remove tasks**

- User have 2 options to remove a task
 
  - first option is click on menu header top right
 
    - click on option remove tasks
 
    - The user will see a checkbox in all items the user can select one or more tasks
 
    - click on icon trash on header top left
   
    - All tasks selected will be deleted, if the user no select any tasks can undo the action on icon arrow back on top header left

  - second option is when a task have expired
 
  - the user can click on task to see details or click on menu the only option the user will see is remove the task
