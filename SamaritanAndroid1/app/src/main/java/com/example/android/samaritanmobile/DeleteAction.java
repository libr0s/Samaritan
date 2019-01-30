package com.example.android.samaritanmobile;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public class DeleteAction extends Connection {

    String service = "adres/usluga";

    public void connect(String id_akcji) throws IOException {
        service = address + "/action/{"+id_akcji+"}";

        url = new URL(service);
        connection = (HttpURLConnection) url.openConnection();

        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("Bearer", Token.getInstance().getToken());

        connection.setRequestMethod("DELETE");
    }

    @Override
    protected String doInBackground(String... strings) {
        return null;
    }
}
