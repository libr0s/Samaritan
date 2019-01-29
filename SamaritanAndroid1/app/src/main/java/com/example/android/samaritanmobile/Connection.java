package com.example.android.samaritanmobile;

import android.util.Log;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

//Singleton
public class Connection extends Thread {
    private static final Connection ourInstance = new Connection();

    private Connection() {
    }

    public static Connection getInstance() {
        return ourInstance;
    }

    private String address = "http://192.168.99.100:8000"; //tu mozna zmienic adres np na localhost czy jakikolwiek inny
    private String request = "adres/usluga";

    private String token = "none";

    static HttpURLConnection connection;
    static URL url;

    JSONObject response;

    private static JSONObject getJSON() {
        try {
            Log.d("Get-Request", url.toString());
            try {
                BufferedReader bufferedReader = new BufferedReader(
                        new InputStreamReader(connection.getInputStream()));
                StringBuilder stringBuilder = new StringBuilder();
                String line;
                while ((line = bufferedReader.readLine()) != null) {
                    stringBuilder.append(line).append("\n");
                }
                bufferedReader.close();
                Log.d("Get-Response", stringBuilder.toString());
                return new JSONObject(stringBuilder.toString());
            } finally {
                connection.disconnect();
            }
        } catch (Exception e) {
            Log.e("ERROR", e.getMessage(), e);
            return null;
        }
    }


    public void registrationGETReq() throws IOException {
        request = address + "/registration";

        url = new URL(request);
        connection = (HttpURLConnection) url.openConnection();

        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestMethod("GET");

        Thread t = new Thread(this);
        t.start();

    }

    public void registrationPOSTReq(String email, String password, String name, String surname, String location) throws IOException {
        request = address + "/registration";

        url = new URL(request);
        connection = (HttpURLConnection) url.openConnection();

        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");

        connection.setRequestMethod("POST");
    }

    public void loginPOSTReq(String email, String pass) throws IOException {
        /*
        Wysylanie Jsonow przez http
        https://stackoverflow.com/questions/21404252/post-request-send-json-data-java-httpurlconnection
         */
        request = address + "/login";

        url = new URL(request);
        connection = (HttpURLConnection) url.openConnection();

        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");

        connection.setRequestMethod("POST");

        //TODO zapisywać token
    }

    public void logoutPOSTReq() throws IOException {
        request = address + "/logout";

        url = new URL(request);
        connection = (HttpURLConnection) url.openConnection();

        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("Bearer", token);

        connection.setRequestMethod("POST");
    }

    public void profileGETReq() throws IOException {
        request = address + "/profile";

        url = new URL(request);
        connection = (HttpURLConnection) url.openConnection();

        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("Bearer", token);

        connection.setRequestMethod("GET");
    }

    public void actionsGETReq() throws IOException {
        request = address + "/actions";

        url = new URL(request);
        connection = (HttpURLConnection) url.openConnection();

        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("Bearer", token);

        connection.setRequestMethod("GET");
    }

    public void actionsPOSTReq() throws IOException {
        request = address + "/actions";

        url = new URL(request);
        connection = (HttpURLConnection) url.openConnection();

        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("Bearer", token);

        connection.setRequestMethod("POST");
    }

    public void actionGETReq(String id_akcji) throws IOException {
        request = address + "/action/{"+id_akcji+"}";

        url = new URL(request);
        connection = (HttpURLConnection) url.openConnection();

        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("Bearer", token);

        connection.setRequestMethod("POST");
    }

    public void actionPUTreq(String id_akcji) throws IOException {
        request = address + "/action/{"+id_akcji+"}";

        url = new URL(request);
        connection = (HttpURLConnection) url.openConnection();

        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("Bearer", token);

        connection.setRequestMethod("PUT");
    }

    public void actionDELETEReq(String id_akcji) throws IOException {
        request = address + "/action/{"+id_akcji+"}";

        url = new URL(request);
        connection = (HttpURLConnection) url.openConnection();

        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("Bearer", token);

        connection.setRequestMethod("DELETE");
    }


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public void run() {
        response = getJSON();
    }
}
