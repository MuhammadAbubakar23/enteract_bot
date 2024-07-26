import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from 'src/app/services/header.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ConversationlBotService } from '../../services/conversationl-bot.service';

@Component({
  selector: 'app-conversational-bot',
  templateUrl: './conversational-bot.component.html',
  styleUrls: ['./conversational-bot.component.scss']
})
export class ConversationalBotComponent implements OnInit {
  bots: any[] = [];
  fileArray: any = [];
  isButtonDisabled = false;
  currentId = 0;
  constructor(private _hS: HeaderService, private sidenavService: SidenavService, private _toastr: ToastrService, private _cBS: ConversationlBotService) {
    _hS.updateHeaderData({
      title: 'Conversational Bot',
      tabs: [{ title: '', url: '', isActive: true }],
      isTab: false,
      class: "fa-light fa-calendar"
    })
  }
  ngOnInit(): void {
    this.getBots();
  }
  getBots() {
    this.bots.push(
      { name: 'Generative Ai', icon: 'fa-light fa-message-bot' },
      { name: 'HelperBot', icon: 'fa-light fa-message-bot' },
      { name: 'Proxima Ai', icon: 'fa-light fa-message-bot' },
      { name: 'ChatSensei Ai', icon: 'fa-light fa-message-bot' },
      { name: 'MegaBot Ai', icon: 'fa-light fa-message-bot' },
    )
    // this._cBS.getBots().subscribe((res: any) => {

    // })
  }
  getBotDetails() {
    this._cBS.getBotById(this.currentId).subscribe((res) => {
      const parsedpfDate = new Date(res.data.date);
      //res.data.date = this.datePipe.transform(parsedpfDate, 'yyyy-MM-dd');
      this.conversationalBotForm.patchValue({

      });

    })
  }
  conversationalBotForm = new FormGroup({
    botName: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    prompts: new FormControl('', [Validators.required]),
    sessionTimeOut: new FormControl('', [Validators.required])
  });

  get cBF() {
    return this.conversationalBotForm.controls
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {

      for (let i = 0; i < files.length; i++) {
        this.fileArray.push(files.item(i));
      }
    }
  }

  submitForm() {
   
    debugger
    if (this.conversationalBotForm.valid) {
      this.isButtonDisabled = true;
      const formData = new FormData();
      formData.append('botName', String(this.conversationalBotForm.value['botName']));
      formData.append('url', String(this.conversationalBotForm.value['url']));
      formData.append('prompts', String(this.conversationalBotForm.value['prompts']));
      formData.append('sessionTimeOut', String(this.conversationalBotForm.value['sessionTimeOut']));
      for (let i = 0; i < this.fileArray.length; i++) {
        formData.append('Files', this.fileArray[i]);
      }
      if (this.currentId !== 0 && this.currentId !== undefined) {
        this._cBS.updateBot(formData).subscribe((res) => {
          this.isButtonDisabled = false;
          if (res.statusCode === 200) {
            this._toastr.success('Bot Updated SuccessFully!', 'Success!', {
              timeOut: 3000,
            });
            //this.getBots();
          }

        }, (error: any) => {
          this._toastr.error('Failed!', 'Error', {
            timeOut: 3000,
          });
        })
      }
      else {
        this._cBS.createBot(formData).subscribe((res) => {
          if (res.statusCode === 200) {

            this._toastr.success('Bot Created SuccessFully!', 'Success!', {
              timeOut: 3000,
            });
           // this.getBots();
          }


        }, (error: any) => {

          this._toastr.error('Failed!', 'Error', {
            timeOut: 3000,
          });
        })
      }
    }

    else {
      this.markFormGroupTouched(this.conversationalBotForm);
    }

  }


  deleteLoan(id: any) {
    this._cBS.deleteBot(id).subscribe((res) => {
      if (res.statusCode === 200) {
        this._toastr.success('Bot Updated SuccessFully!', '', {
          timeOut: 3000,
        });
        this.getBots();
      }
    }, (error: any) => {

      this._toastr.error('Failed!', 'Error', {
        timeOut: 3000,
      });
    })
  }
}
