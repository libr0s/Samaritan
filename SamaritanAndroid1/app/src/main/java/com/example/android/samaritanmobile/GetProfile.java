package com.example.android.samaritanmobile;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public class GetProfile extends Connection {

    String service = "adres/usluga";

    public void connect() throws IOException {
        service = address + "/profile";

        url = new URL(service);
        connection = (HttpURLConnection) url.openConnection();

        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("Bearer", Token.getInstance().getToken());

        connection.setRequestMethod("GET");
    }


    @Override
    protected String doInBackground(String... strings) {
        return null;
    }
}
