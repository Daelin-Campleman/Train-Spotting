package com.train.TrainSpotting;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class DockerMessageController {


    @GetMapping("/")
    public String home(){
        return "Train Spotting API base URL";
    }
    
    @GetMapping("/messages")
    public String getMessage() {
        return "Hello from  Docker!";
    }

    @PostMapping("/user")
    public void create(@RequestBody String email) {
        new UserRepository().createUser(email);
    }

    @PostMapping("/score")
    public void update(@RequestBody RequestScore score) {

        new UserRepository().updateScore(score.getEmail(),score.getScore());
    }

    @GetMapping("/score/{email}")
    public String fetch(@PathVariable String email) {
       return new UserRepository().getUserScoresByEmail(email).toString();
        
    }


}
