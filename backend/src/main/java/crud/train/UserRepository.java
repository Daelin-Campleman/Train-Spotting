package crud.train;

import javax.swing.JOptionPane;
import java.sql.*;
import java.util.regex.Pattern;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;



public class UserRepository {

    private final String createUserQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    private final String getUserByUsernameQuery = "SELECT * FROM users WHERE username=?";
    private final String updateScoreQuery = "UPDATE users SET score=? WHERE username=?";
    private final String getAllScoresByUsernameQuery = "SELECT * FROM scores WHERE username=?";

    private Properties properties;

    public UserRepository() {
        loadConfig();
    }

    private void loadConfig() {
        properties = new Properties();
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("config.properties")) {
            properties.load(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load configuration file.");
        }
    }

    private Connection getConnection() throws SQLException {
        String url = properties.getProperty("db.url");
        String username = properties.getProperty("db.username");
        String password = properties.getProperty("db.password");
        return DriverManager.getConnection(url, username, password);
    }
    public User createUser(User user) {
        validateUser(user);

        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(createUserQuery, Statement.RETURN_GENERATED_KEYS)) {

            preparedStatement.setString(1, user.getUsername());
            preparedStatement.setString(2, user.getEmail());
            preparedStatement.setString(3, user.getPassword());

            int affectedRows = preparedStatement.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Creating user failed, no rows affected.");
            }

        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Failed to create user. Please try again!", "Error", JOptionPane.ERROR_MESSAGE);
        }

        return user;
    }

    public User getUserByUsername(String username) {
        User user = null;

        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(getUserByUsernameQuery)) {

            preparedStatement.setString(1, username);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    String email = resultSet.getString("email");
                    String password = resultSet.getString("password");

                    user = new User(username, email, password);
                    fetchUserScores(connection, user); 
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Failed to retrieve user scores!", "Error", JOptionPane.ERROR_MESSAGE);
        }

        return user;
    }

    
    
    private void fetchUserScores(Connection connection, User user) {
        List<Integer> scores = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement(getAllScoresByUsernameQuery)) {
            preparedStatement.setString(1, user.getUsername());

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    int score = resultSet.getInt("score");
                    user.addScore(score);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Failed to retrieve user scores", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
    
    



    private void validateUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null.");
        }
        if (!isValidUsername(user.getUsername())) {
            throw new IllegalArgumentException("Invalid username.");
        }
        if (!isValidEmail(user.getEmail())) {
            throw new IllegalArgumentException("Invalid email format.");
        }
        if (!isValidPassword(user.getPassword())) {
            throw new IllegalArgumentException("Invalid password.");
        }
    }



    private boolean isValidUsername(String username) {
        return username != null && !username.isEmpty();
    }
    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        return email != null && Pattern.matches(emailRegex, email);
    }
    private boolean isValidPassword(String password) {
        return password != null && password.length() >= 8;
    }



    public void updateScore(String username, int newScore) {
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(updateScoreQuery)) {

            preparedStatement.setInt(1, newScore);
            preparedStatement.setString(2, username);

            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Updating score failed, no rows affected.");
            }

        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Failed to update user score. Please try again later.", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }


}
