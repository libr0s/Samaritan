package com.example.android.samaritanmobile;

import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.TypedValue;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import java.util.ArrayList;

/**
 * Created by Paulina on 04.01.2019.
 */
public class MessagesActivity extends AppCompatActivity {

    TableLayout messagesTable;
    int i;
    Context context = this;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_messages);

        messagesTable = findViewById(R.id.tableMessages);
        final ArrayList<Message> messages = loadMessages();

        for(i = 0; i < messages.size(); i++){
            final TableRow tableRow = new TableRow(this);
            tableRow.setMinimumWidth(messagesTable.getWidth());
            TextView tv = new TextView(this);
            tv.setText(messages.get(i).getContent());
            tv.setTextSize(TypedValue.COMPLEX_UNIT_PX,getResources().getDimension(R.dimen.clickable_text_size));
            final Button replyButton = new Button(this);
            replyButton.setText(DataStorage.Reply);
            tableRow.addView(tv);
            tableRow.addView(replyButton);
            messagesTable.addView(tableRow);

            tv.setMaxWidth(tableRow.getWidth());
            replyButton.setTag((int)i);
            replyButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    int id = (int)replyButton.getTag();
                    Message clickedMessage = messages.get(id);
                    final Dialog replyMessageDialog = new Dialog(context);
                    replyMessageDialog.setContentView(R.layout.dialog_send_message);
                    replyMessageDialog.show();
                    TextView receipientTV = replyMessageDialog.findViewById(R.id.tvMessageRecipient);
                    final EditText messageET = replyMessageDialog.findViewById(R.id.etMessage);
                    Button sendButton = replyMessageDialog.findViewById(R.id.bttnSendMessage);

                    receipientTV.setText(DataStorage.ReplyTo + clickedMessage.getOrganization().getName());
                    /*sendButton.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            String message = messageET.getText().toString();
                            //TODO send to backend
                            replyMessageDialog.dismiss();
                        }
                    });*/
                }
            });
            int t =(int) getResources().getDimension(R.dimen.table_row_padding);



        }

    }

    private ArrayList<Message> loadMessages() {

        //TODO loading data from backend
        //instead:
        ArrayList<Message> a = new ArrayList<>();

        a.add(new Message(new Organization(1, "Wolontariat", "Bardzo fajna sprawa"),"Miło było Cie spotkac. Mmy nadzieje ze szybko do nas wrocisz. Czekamy z niecierpliwoscią!!! Pozdrawiamy", "12-12-2018"));
        a.add(new Message( new Organization(2, "OEFL", "Przeprowadzanie przez ulice") ,"Dobra robota", "12-12-2018"));
        a.add(new Message(new Organization(3, "Unicef", "Bajki o smutnych programistach"),"Miło było Cie spotkac", "12-12-2018"));
        return a;
    }
}
