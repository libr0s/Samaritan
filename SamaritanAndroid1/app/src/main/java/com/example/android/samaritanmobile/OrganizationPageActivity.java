package com.example.android.samaritanmobile;

import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

/**
 * Created by Paulina on 11.12.2018.
 */
public class OrganizationPageActivity extends AppCompatActivity{

    private TextView organizationNameTV, organizationDescriptionTV;
    private Button sendMessageButton;
    private Organization organization;
    private final Context context = this;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_organization_page);

        Intent i = getIntent();
        organization = (Organization) i.getSerializableExtra("clickedOrganization");

        organizationNameTV = findViewById(R.id.organization_name_text_view);
        organizationDescriptionTV = findViewById(R.id.organization_description_text_view);
        sendMessageButton = findViewById(R.id.bttnSendMessage);

        organizationNameTV.setText(organization.getName());
        organizationDescriptionTV.setText(organization.getDescription());
        sendMessageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final Dialog messageDialog = new Dialog(context);
                messageDialog.setContentView(R.layout.dialog_send_message);
                messageDialog.show();
                TextView receipientTV = messageDialog.findViewById(R.id.tvMessageRecipient);
                final EditText messageET = messageDialog.findViewById(R.id.etMessage);
                Button sendButton = messageDialog.findViewById(R.id.bttnSendMessage);

                receipientTV.setText(DataStorage.To + organization.getName());
                sendButton.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        String message = messageET.getText().toString();
                        //TODO send to backend
                        messageDialog.dismiss();
                    }
                });
            }
        });




    }

}
