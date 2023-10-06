pipeline {

    agent any
    
    stages {

        stage('Packaging/Pushing image FE') {

            steps {
                withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                    sh 'docker build --pull --rm -f Dockerfile -t fublogui:latest .'
                    sh 'docker tag fublogui:latest chalsfptu/fublogui:latest'
                    sh 'docker push chalsfptu/fublogui:latest'
                }
            }
        }

        stage('Deploy FE') {
            steps {
                echo 'Deploying and cleaning'
                sh 'docker image pull chalsfptu/fublogui:latest'
                sh 'docker container stop chalsfptu/fublogui:latest || echo "this container does not exist" '
                sh 'echo y | docker container prune '
                sh 'docker container run -d --rm --name fublogui -p 83:80  chalsfptu/fublogui --restart unless-stopped'
            }
        }
        
 
    }
    post {
        // Clean after build
        always {
            cleanWs()
        }
    }
}