from locust import FastHttpUser, task

class GameInfo(FastHttpUser):
    @task
    def MLB(self):
        self.client.get("MLB/games")
        self.client.get("MLB/Standings")
    @task
    def NBA(self):
        self.client.get("NBA/games")
        self.client.get("NBA/Standings")
    @task
    def NHL(self):
        self.client.get("NHL/games")
        self.client.get("NHL/Standings")
    @task
    def NFL(self):
        self.client.get("NFL/games")
        self.client.get("NFL/Standings")
    @task
    def Sports(self):
        self.client.get("sport")
        #self.client.get("sport/:sport") (NBA) OR (NFL) OR (NHL) OR (MLB)
        #self.client.get("sport/:sport/teams")
#    @task
#    def News(self): 
#        self.client.get("news/(NBA) OR (NFL) OR (NHL) OR (MLB)")
#    @task
#    def Reddit(self):
#        self.client.get("subreddit/")

    
