package com.example.android.samaritanmobile;

/*
 * Created by Jakub on 28.01.2019.
 */
import android.os.AsyncTask;
import android.util.Log;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Connection extends AsyncTask<String , Void ,String> {

    String address = "http://192.168.99.100:8000"; //tu mozna zmienic adres np na localhost czy jakikolwiek inny

    static HttpURLConnection connection;
    static URL url;

    JSONObject response;
    JSONObject request;

    private static JSONObject getJSON() {
        try {
            Log.d("Get-Request", url.toString());
            try {
                BufferedReader bufferedReader = new BufferedReader(
                        new InputStreamReader(connection.getInputStream()));

                //setToken(connection.getHeaderField("bearer"));
                if(400 == connection.getResponseCode()){return null;
                }

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

    @Override
    protected String doInBackground(String... strings) {
        return null;
    }
}
