### Introduction

This is a demonstrationof a basic OpenShift CI/CD pipeline deploying an application in Development then Test. The application is a basic PHP/ReactJS CRUD application using a MySQL database.

![alt tag](http://i63.tinypic.com/2vci87n.png)

Note that this application was forked from this [repo](https://github.com/andy1992/react-crud.git), original license and rights remain in effect.

### Installation

An ansible playbook has been provided to make this demo easy to install. To do so, go to the ansible directory and configure the vars.yml file to reflect your installation. Once that is done, run the following command:

```
ansible-playbook pipeline.yml
```

Note the playbook will display a couple of errors when patching out the triggers in the deploymentConfig, these can be ignored. 

To remove the application from OpenShift use the teardown playbook:

```
ansible-playbook teardown.yml
```

### Sign-In

The application allows you to register to access the administrative interface. Alternatively, a credential of ```demo@demo.com/Welcome1``` is provisioned.

### Demo Flow

When I demo this project, I typically use a scenario of pretending to be 'Tom', a new developer who has been tasked with updating the application. Prior to doing the demo, I create a webhook between the pipeline and my github repository. Of course you will need to fork to your own repo to do the same thing.

* First Tom needs to familiarize himself with the application. So Tom logs into OpenShift into an empty workspace.
* Tom then creates a new poject called 'product-catalog-debug'
* Tom adds the application using the product-catalog template
* Wait for application to build and be available, use opportunity to walk through OpenShift environment
* Very quick 20 second demo of application
* Log out as Tom and login to user that has the Dev, Test and CI/CD projects
* Walk people through the projects and how they work. Explain the pipeline at a high level.
* Go back to Tom, explain he has been tasked with adding some store branding to the site
* In an editor or in github itself, edit the file ```react-crud/libs/js/react/components/layouts/nav.jsx``` and uncomment the lines 47-62 (the lines with the div navbar-header class name)
* Save changes, commit and push to git
* Webhook should kick-in automatically and start pipeline.