package com.example.android.samaritanmobile;

import android.annotation.TargetApi;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.GradientDrawable;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutCompat;
import android.text.Layout;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
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
    private AlertDialog alert;
    int id;

    @TargetApi(Build.VERSION_CODES.JELLY_BEAN)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_messages);

        messagesTable = (TableLayout) findViewById(R.id.tableMessages);
        final ArrayList<Message> messages = loadMessages();

        for(i = 0; i < messages.size(); i++){
            final TableRow tableRow = new TableRow(this);

            final ImageView messageIcon = new ImageView(this);

            messageIcon.setImageResource(R.drawable.message_icon);




            LinearLayout layout = new LinearLayout(this);
            layout.setOrientation(LinearLayout.HORIZONTAL);
            layout.setBackground(ContextCompat.getDrawable(context, R.drawable.cell_bottom_stroke));
            layout.addView(messageIcon);

            LinearLayout textLinearLayout = new LinearLayout(this);
            textLinearLayout.setOrientation(LinearLayout.VERTICAL);
            layout.setPadding(30,30,30,30);


            TextView tvSeder = new TextView(this);
            TextView tv = new TextView(this);
            tv.setPadding(0,10,0,0);
            tv.setTextSize(TypedValue.COMPLEX_UNIT_PX,getResources().getDimension(R.dimen.clickable_text_size));
            tv.setText(messages.get(i).getContent());

            tvSeder.setTextSize(TypedValue.COMPLEX_UNIT_PX,getResources().getDimension(R.dimen.small_title_text_size));
            tvSeder.setText(DataStorage.From + messages.get(i).getOrganization().getName());
            tvSeder.setPadding(0,20,0,0);

            textLinearLayout.addView(tvSeder);
            textLinearLayout.addView(tv);

            layout.addView(textLinearLayout);
            tableRow.addView(layout);

            messagesTable.addView(tableRow);
            int t =(int) getResources().getDimension(R.dimen.table_row_padding);

            messageIcon.getLayoutParams().height = 250;
            messageIcon.getLayoutParams().width = 250;
            messageIcon.setPadding(0,0,50,0);

            tableRow.setTag((int)i);
            tableRow.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    id = (int)tableRow.getTag();
                    final Dialog readMessageDialog = new Dialog(context);
                    readMessageDialog.setContentView(R.layout.dialog_read_message);
                    readMessageDialog.show();

                    final TextView senderTV = readMessageDialog.findViewById(R.id.tvMessageSender);
                    final TextView messageTV = readMessageDialog.findViewById(R.id.tvMessageText);
                    senderTV.setTextSize(30);
                    messageTV.setTextSize(20);
                    Button deleteMessageButton = readMessageDialog.findViewById(R.id.bttnDelete);
                    Button respondButton = readMessageDialog.findViewById(R.id.bttnReply);

                    senderTV.setText(DataStorage.From + messages.get(id).getOrganization().getName());

                    messageTV.setText(messages.get(id).getContent());


                    deleteMessageButton.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            final AlertDialog.Builder alertDialog = new AlertDialog.Builder(MessagesActivity.this);
                            alertDialog.setTitle(DataStorage.doYouWantToDeleteMessage);
                            alertDialog.setPositiveButton(DataStorage.Yes, new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialog, int which) {
                                    //TODO - send to backend that user wants to delete


                                }
                            });

                            alertDialog.setNegativeButton(DataStorage.No, new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialog, int which) {
                                    alert.dismiss();
                                }
                            });
                            alert = alertDialog.show();
                        }
                    });

                    respondButton.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            final Dialog replyMessageDialog = new Dialog(context);
                            replyMessageDialog.setContentView(R.layout.dialog_send_message);
                            replyMessageDialog.show();
                            TextView receipientTV = replyMessageDialog.findViewById(R.id.tvMessageRecipient);
                            receipientTV.setTextSize(20);
                            final EditText messageET = replyMessageDialog.findViewById(R.id.etMessage);
                            messageET.setTextSize(20);
                            Button sendButton = replyMessageDialog.findViewById(R.id.bttnSendMessage);

                            receipientTV.setText(DataStorage.ReplyTo + messages.get(id).getOrganization().getName());
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

                }
            });

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
