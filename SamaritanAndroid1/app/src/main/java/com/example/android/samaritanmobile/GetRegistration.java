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

public class GetRegistration extends Connection {

    String server_response;

    @Override
    protected String doInBackground(String... strings) {
        URL url;
        HttpURLConnection connection = null;

        try {
            url = new URL(address + "/registration");

            connection = (HttpURLConnection) url.openConnection();

            //connection.setDoOutput(true);
            //connection.setDoInput(true);

            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("accept", "application/json");

            connection.setRequestMethod("GET");

            //connection. wysylanie json'a
            /*
            OutputStreamWriter wr = new OutputStreamWriter(connection.getOutputStream());
            wr.write("test");
            wr.flush();
            */

            int responseCode = connection.getResponseCode();

            if (responseCode == 200) {
                server_response = readStream(connection.getInputStream());
                Log.v("Server_Response", server_response);
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

        try {
            response = new JSONObject(server_response);
        } catch (JSONException e) {
            e.printStackTrace();
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
