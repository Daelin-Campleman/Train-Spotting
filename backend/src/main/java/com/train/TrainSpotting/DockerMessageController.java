package com.train.TrainSpotting;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DockerMessageController {
    @GetMapping("/")
    public String home(){
        return "Train Spotting API base URL";
    }
    
    @GetMapping("/messages")
    public String getMessage() {
        return "Hello from Docker!";
    }
}
