package crud.train;

import java.util.ArrayList;
import java.util.List;

public class User {

    private String email;
    private List<Integer> scores;

    public User(String email) {
        setEmail(email);
        this.scores = new ArrayList<>();
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public List<Integer> getScores() {
        return scores;
    }
    public void addScore(int score) {
        scores.add(score);
    }
}
