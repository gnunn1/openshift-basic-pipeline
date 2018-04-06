This is an example of a cross-cluster pipeline where we have a CI/CD and Development project in one cluster and a Test project in a different cluster. This example uses skopeo to copy the image between the two clusters.

To setup this example you will need to have two separate OCP clusters available. Additionally this example requires a properly subscribed system in order to build the skopeo jenkins build slave.

Here are instructions for setting this up, unlike the basic pipeline it is not automated but pretty straightforward.

### In the Development cluster:

1. Create a CI/CD project:

```oc new-project product-catalog-cicd --display-name='CI/CD'```

2. Create a new persistent jenkins application. While ephemeral can we work there is some configuration of jenkins required and it is nice to have it persisted across stop/starts of the cluster

3. Deploy the pipeline to the project:

```oc create -f cross-cluster-pipeline.yml```

4. Get the token for the Jenkins service account and record it somewhere:

```oc sa get-token jenkins```

5. Create the development project:

```oc new-project product-catalog-dev --display-name='Catalog Development'```

6. Create the application in the Development using the template:

```oc process -f openshift-template-persistent.yml | oc apply -f -```

7. Disable the triggers for the application since we want the pipeline to control the deployment:

```oc set triggers dc product-catalog --containers='product-catalog' --from-image='product-catalog:latest' --manual=true -n product-catalog-dev```

8. Add permisions for the jenkins service account to work with the development project:

```oc policy add-role-to-user edit system:serviceaccount:product-catalog-cicd:jenkins -n product-catalog-dev```

### In the Test Cluster:

1. Create the test project:

```oc new-project product-catalog-test --display-name='Catalog Test'```

2. Deploy the application into the test environment

```oc process -f openshift-template-persistent.yml | oc apply -f -```

3. Create a Jenkins service account that the CI/CD on the development cluster will use:

```oc create sa jenkins```

4. Give the Jenkins SA permissions to work with the project:

```oc policy add-role-to-user edit system:serviceaccount:product-catalog-cicd:jenkins -n product-catalog-test```

5. Get the token for the Jenkins service account:

```oc sa get-token jenkins```

6. Disable the triggers for the application since we want the pipeline to control the deployment:

```oc set triggers dc product-catalog --containers='product-catalog' --from-image='product-catalog:latest' --manual=true -n product-catalog-test```

### In the Dev Cluster:

We have two ```jenkins``` tokens, one for the dev cluster and one for test. Now we need to add them as secrets to jenkins

1. Log into Jenkins and navigate to Credentials > System and click on "Global credentials (unrestricted)". Click "Add credential" and select "Secret text" from the Kind combo. Set the secret to be ```jenkins:TOKEN``` where you replace TOKEN with the token for the jenkins SA from the DEV cluster. Set the ID field to DEV_CREDS and save it.

2. Repeat step 1 but use the token for the ```jenkins``` account from the test cluster. Set the ID field to be TEST_CREDS and then save it.

3. Next we need to configure Jenkins in the Dev cluster to be able to access the test cluster. Configure  openshift cluster as per the instructions (here)[https://github.com/openshift/jenkins-client-plugin/blob/master/README.md#configuring-an-openshift-cluster]. Name the cluster ```test``` to match what is in the pipeline.

### Run the demo

At this point in dev you can hit the ```Start Pipeline``` button and it will kick off the flow. If you want to try making a code change, you can add the logo in the file ```react-crud/libs/js/react/components/layouts/nav.jsx``` by uncommenting the lines 47-62 (the lines with the div navbar-header class name).

