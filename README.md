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
