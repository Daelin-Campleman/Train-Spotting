package crud.train;

import javax.swing.JOptionPane;
import java.sql.*;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Properties;



public class UserRepository {

    private final String createUserQuery = "INSERT INTO Users (UserName,Email) VALUES (?,?)";
    private final String getUserByEmailQuery = "SELECT * FROM Users WHERE Email=?";
    private final String updateScoreQuery = "INSERT INTO Leaderboard (Email,Score,Timestamp VALUES (?,?,?)"; 
    private final String getAllScoresByEmailQuery = "SELECT * FROM Leaderboard WHERE Email=?";

    private String errorCode = "Error";

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

        return DriverManager.getConnection(url);
    }


//------------------------------------------------------------------------------------------------------------------------


    public void createUser(String email) {
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(createUserQuery)) {

            preparedStatement.setString(1, email);

            int affectedRows = preparedStatement.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Creating user failed, no rows affected.");
            }

        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Failed to create user. Please try again!", errorCode, JOptionPane.ERROR_MESSAGE);
        }
    }


    

//------------------------------------------------------------------------------------------------------------------------

    public User getUserByEmail(String email) {
        User user = null;

        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(getUserByEmailQuery)) {

            preparedStatement.setString(1, email);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    user = new User(email);
                    fetchUserScores(connection, user); 
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Failed to retrieve user scores!", errorCode, JOptionPane.ERROR_MESSAGE);
        }

        return user;
    }



    // fetch all scores using the user object's email created from above
    
    private List fetchUserScores(Connection connection, User user) {

        try (PreparedStatement preparedStatement = connection.prepareStatement(getAllScoresByEmailQuery)) {
           
            preparedStatement.setString(1, user.getEmail());

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    int score = resultSet.getInt("score");
                    user.addScore(score);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Failed to retrieve user scores", errorCode, JOptionPane.ERROR_MESSAGE);
        }

        return user.getScores();
    }



    //------------------------------------------------------------------------------------------------------------------------


    public void updateScore(String email, int newScore) {
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(updateScoreQuery)) {

            preparedStatement.setString(1, email);
            preparedStatement.setInt(2, newScore);

            final Timestamp currentTMStamp = new Timestamp(System.currentTimeMillis());
            preparedStatement.setTimestamp(3, currentTMStamp);

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
