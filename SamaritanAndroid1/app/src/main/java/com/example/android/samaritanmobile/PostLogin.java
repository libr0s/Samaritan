package com.example.android.samaritanmobile;

import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class PostLogin extends Connection {

    public void connect(String email, String pass) throws IOException {
        /*
        Wysylanie Jsonow przez http
        https://stackoverflow.com/questions/21404252/post-request-send-json-data-java-httpurlconnection
         */

        request = new JSONObject();
        try {
            request.put("email", email);
            request.put("password", pass);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        this.execute();
    }

    String server_response;

    @Override
    protected String doInBackground(String... strings) {
        URL url;
        HttpURLConnection connection = null;

        try {
            url = new URL(address + "/login");

            connection = (HttpURLConnection) url.openConnection();

            connection.setDoOutput(true);
            connection.setDoInput(true);

            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("accept", "application/json");

            connection.setRequestMethod("POST");

            //connection. wysylanie json'a

            OutputStreamWriter wr = new OutputStreamWriter(connection.getOutputStream());
            wr.write(request.toString());
            wr.flush();


            int responseCode = connection.getResponseCode();

            if (responseCode == 200) {
                Token.getInstance().setToken(connection.getHeaderField("bearer"));
                server_response = readStream(connection.getInputStream());
                Log.v("Server_Response", server_response);
            }
            if(responseCode==400){
                Log.v("Server_Response", "Incorrect data");
            }

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);

        if (response!=null){
        try {
            response = new JSONObject(server_response);
        } catch (JSONException e) {
            e.printStackTrace();
        }} else {
            Log.e("Server", "There was error response");
        }

        //Log.e("Response", response.toString());

    }


    ////
    private String readStream(InputStream in) {
        BufferedReader reader = null;
        StringBuffer response = new StringBuffer();
        try {
            reader = new BufferedReader(new InputStreamReader(in));
            String line = "";
            while ((line = reader.readLine()) != null) {
                response.append(line).append("\n");
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return response.toString();
    }
}
