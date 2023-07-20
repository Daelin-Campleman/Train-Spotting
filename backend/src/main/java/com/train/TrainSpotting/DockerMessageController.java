package com.train.TrainSpotting;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DockerMessageController {
    @GetMapping("/messages")
    public String getMessage() {
        return "Hello from Docker!";
    }

    @GetMapping("/error")
    public String getError() {
        return "Error: Invalid end-point";
    }
}
