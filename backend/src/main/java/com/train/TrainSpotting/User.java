package com.train.TrainSpotting;

import java.util.HashMap;
import java.util.Map;
import java.sql.*;

public class User {

    private String email;
    private Map<Integer, Timestamp> scoresWithTimestamps;

    private int score;

    // -------------------------------------------------
    public User(String email) {
        setEmail(email);
    }
    public User (){
        this.scoresWithTimestamps = new HashMap<>();
    }
    // -------------------------------------------------
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    // -------------------------------------------------
    public void addScoresWithTimestamp(int score, Timestamp timestamp) {
        scoresWithTimestamps.put(score, timestamp);
    }
    public Map<Integer, Timestamp> getScoresWithTimestamps() {
        return scoresWithTimestamps;
    }
    // -------------------------------------------------
}
