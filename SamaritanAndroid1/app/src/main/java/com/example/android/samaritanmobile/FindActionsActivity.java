package com.example.android.samaritanmobile;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.TypedValue;
import android.view.View;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import java.util.ArrayList;

/**
 * Created by Paulina on 11.12.2018.
 */
public class FindActionsActivity extends AppCompatActivity {

    TableLayout actionsTable;
    int i;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_find_actions);

        actionsTable = (TableLayout) findViewById(R.id.tableActions);
        final ArrayList<Action> actions = loadUsersActions();
        for(i = 0; i < actions.size(); i++){
            final TableRow tableRow = new TableRow(this);
            TextView tv = new TextView(this);
            tv.setText(actions.get(i).getName());
            tv.setTextSize(TypedValue.COMPLEX_UNIT_PX,getResources().getDimension(R.dimen.clickable_text_size));
            tableRow.addView(tv);
            tableRow.setTag((int)i);
            int t =(int) getResources().getDimension(R.dimen.table_row_padding);
            tableRow.setPadding(t,t,t,t);
            tableRow.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    int id = (int)tableRow.getTag();
                    Action clickedAction = actions.get(id);
                    Intent i = new Intent(FindActionsActivity.this, ActionActivity.class);
                    i.putExtra("clickedAction", clickedAction);
                    startActivity(i);
                }
            });
            actionsTable.addView(tableRow);
        }
    }

    public ArrayList<Action> loadUsersActions(){

        //TODO loading data from backend
        //instead:
        ArrayList<Action> a = new ArrayList<>();
        a.add(new Action("Wolontariat", "12-12-2018", "Bardzo fajna sprawa", false));
        a.add(new Action("Pomoc starszym", "12-12-2018", "Przeprowadzanie przez ulice", false));
        a.add(new Action("Czytanie dzieciom", "12-12-2018", "Bajki o smutnych programistach", false));
        a.add(new Action("Zbiorka pieniedzy", "12-12-2018", "Zbiorka na pomoc chorym", false));

        return a;
    }
}
