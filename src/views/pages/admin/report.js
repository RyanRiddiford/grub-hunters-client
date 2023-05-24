/**
 * Restaurant view
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import App from '../../../App';
import {html, render} from 'lit-html';
import AuthAPI from '../../../services/AuthAPI';
import UserAPI from '../../../services/UserAPI';
import ReportAPI from '../../../services/ReportAPI';
import enumUtils from '../../../utils/enum.utils';
import Toast from '../../../Toast';


//Renders report view
class ReportView {

  /**
   * Initialise
   */
  init(){
    document.title = 'Report';   
    this.render();
  }



/**
 * Closes the ticket and optionally gives offender a demerit
 * @param {*} action Denotes whether to give the target user a demerit
 */
  reportActionHandler(action) {
    //Close ticket and give user a demerit
    if (action == "demerit") {
      const btn = document.getElementById('disciplinary-btn');
      btn.setAttribute('loading', '');
                //Close the report ticket
                ReportAPI.closeTicket(AuthAPI.currentReport._id);
                //If profile is flagged, get user id from report
                if (AuthAPI.currentReport.targetType == "restaurant") {
            UserAPI.giveDemerit(AuthAPI.currentReport.targetId).then(() => {
              btn.removeAttribute('loading');
              Toast.show('User has been given a demerit');
            });
                }
                //If restaurant review is flagged, get user id from review
                else if (AuthAPI.currentReport.targetType == "review") {
                  UserAPI.giveDemerit(AuthAPI.currentTarget.authorId).then(() => {
                    btn.removeAttribute('loading');
                  Toast.show('User has been given a demerit');
                  });
   
                }      
    }
    //Close ticket with no consequences
    else if (action == "close") {
      const btn = document.getElementById('close-ticket-btn');
      btn.setAttribute('loading', '');
ReportAPI.closeTicket(AuthAPI.currentReport._id).then(() => {
  btn.removeAttribute('loading');
  Toast.show('Closed report with no consequences');
});
    }
  }



  /**
   * Renders the restaurant page
   */
  render(){

    AuthAPI.currentReport = JSON.parse(localStorage.getItem("currentReport"));
    AuthAPI.currentTarget = JSON.parse(localStorage.getItem("currentTarget"));

    let flaggedContent;

    if (AuthAPI.currentReport.targetType == enumUtils.reportTargetType.review) {
flaggedContent = html`<review-listing is_report="true" review=${JSON.stringify(AuthAPI.currentTarget)}></review-listing>`;
    }
    else if (AuthAPI.currentReport.targetType == enumUtils.reportTargetType.restaurant) {
flaggedContent = html`<restaurant-profile is_report="true" is_visitor="true" restaurant=${JSON.stringify(AuthAPI.currentTarget)}></restaurant-profile>`;
    }


const template = html`   


<style>


      #report-container {
        display: flex;
        flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 700px;
      border: 4px solid var(--brand-color);
         padding:20px;

      border-radius:20px;
      }

.top, #show-btn { 
              gap:40px;              
              margin-bottom:20px;
            }



            .mid {
                          display:flex;
              flex-direction:column;
              align-items:start;   
              width:90%;   
              margin-bottom:20px;
              margin-top:20px;
            }




            .mid .top {
              display:flex;
              flex-direction:column;
              align-items:start;  
              width:fit-content;
              padding:10px;
              box-shadow: var(--main-content-box-shadow); 
            }


            .mid .bot {
              display:flex;
              flex-direction:column;
              align-items:start;    
              padding:10px;
              box-shadow: var(--main-content-box-shadow); 
            }

            .bot {
              display:flex;
              flex-direction:row;
              justify-content:space-between;
              width:80%;
              align-items:center;
            }

            #show-flagged-content-btn {
              width:200px;
            }



       
sl-dialog::part(panel) {
  width:fit-content;
}

sl-dialog::part(base) {
 padding:50px;
}

sl-dialog::part(header) {
width:100%;
}

sl-dialog::part(footer) {
  display:flex;
  flex-direction:row;
  justify-content:center;
}


.bold-text {
    font-size:var(--label-font-size);
  font-weight:var(--label-font-weight);
  }


@media all and (max-width: 768px) { 

  #report-container {
      width: 100vw;
      border: none;

      }

            .bot {
              flex-direction:column;
              gap:20px;
            }


            sl-dialog {
              margin:0;
            }



            sl-dialog::part(panel) {
              width: 100vw; 
              margin:0;

}

sl-dialog::part(base) {
 padding:0px;
}

sl-dialog::part(header) {
width:100%;
}




  }
  

</style>



    <app-header title=${document.title} user="${JSON.stringify(AuthAPI.currentUser)}"></app-header>

    
    <sl-dialog id="report-target-dialog" label="Flagged Content" class="dialog-overview">
      ${flaggedContent}
  <sl-button @click="${() => {document.getElementById('report-target-dialog').hide();}}" slot="footer">Close</sl-button>
</sl-dialog>

    <div class="page-content">

    <div id="report-container">
             <h1>Report Ticket</h1>     

      <div class="mid">
       <sl-button id="show-btn" @click="${() => document.getElementById('report-target-dialog').show()}">View Flagged Content</sl-button>     
        <div class="top">
                   
        <div class="reporter-container"><span class="bold-text">Reporter ID: </span><span>${AuthAPI.currentReport.authorId}</span></div>
        <div class="topic-container"><span class="bold-text">Topic: </span><span>${AuthAPI.currentReport.topic}</span></div>
        </div>  
        <div class="comment-container bot">
          <h3>Comment</h3>
          <p>${AuthAPI.currentReport.text}</p>
        </div>
      </div> 
      ${(AuthAPI.currentReport.status == "active") ?
      html`
      <div class="bot">
       
      <sl-button id="close-ticket-btn" @click=${()=> this.reportActionHandler('close')} >Close Ticket</sl-button>
      <sl-button id="disciplinary-btn" @click=${()=> this.reportActionHandler('demerit')}>Disciplinary Action</sl-button>
      </div>      
      ` :
      html``
      }


    </div>

    </div>
    
    <app-footer title=${document.title}></app-footer>
    
    `;
    

    render(template, App.rootEl);
    
  }

}



//Export the view
export default new ReportView();