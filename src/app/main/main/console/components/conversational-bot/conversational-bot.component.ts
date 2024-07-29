import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from 'src/app/services/header.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ConversationlBotService } from '../../services/conversationl-bot.service';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ValueSettingServiceService } from '../../services/value-setting-service.service';

@Component({
  selector: 'app-conversational-bot',
  templateUrl: './conversational-bot.component.html',
  styleUrls: ['./conversational-bot.component.scss']
})
export class ConversationalBotComponent implements OnInit {
  bots: any[] = [];
  default:any = true;
  fileArray: any = [];
  isButtonDisabled = false;
  currentId = 0;
  llms = ['llama3', 'openai', 'mistral', 'groq']
  embeddings = ['mxbai-embed-large', 'nomic-embed-text', 'all-minilm', 'all-MiniLM-L6-v2', 'text-embedding-3-small', 'text-embedding-3-large']
  vdb = ['chroma', 'faiss', 'lancedb']
  documents: any;
  workspace_id: any;
  files: any;
  prompt: any;
  workspaceName: any;
  name: any;
  editButtonClicked: any =false;
  constructor(private ValueSettingServiceService:ValueSettingServiceService ,private toaster:ToastrService, private spinner: NgxSpinnerService ,private _hS: HeaderService, private sidenavService: SidenavService, private _toastr: ToastrService, private _cBS: ConversationlBotService) {
    _hS.updateHeaderData({
      title: 'Conversational Bot',
      tabs: [{ title: '', url: '', isActive: true }],
      isTab: false,
      class: "fa-light fa-calendar",
      subTab: true
    })
  }
  ngOnInit(): void {
    this.getBots();
    this.ValueSettingServiceService.botList$.subscribe(bots => {
      if (bots) {
        this.bots = bots;
        // this.patchWorkspace(currentBot);
      }
    })
  }
  getBots() {
    // this.bots.push(
    //   { name: 'Generative Ai', icon: 'fa-light fa-message-bot' },
    //   { name: 'HelperBot', icon: 'fa-light fa-message-bot' },
    //   { name: 'Proxima Ai', icon: 'fa-light fa-message-bot' },
    //   { name: 'ChatSensei Ai', icon: 'fa-light fa-message-bot' },
    //   { name: 'MegaBot Ai', icon: 'fa-light fa-message-bot' },
    // )
    this.spinner.show()
    this._cBS.getBots().subscribe((res: any) => {
      
      this.bots = res;
      this.spinner.hide();
    }
  ,error =>{
    this.spinner.hide();
  })
  }
  getDocuments(workspace_id:any){
    this.workspace_id = workspace_id;
    this.getName();
    const params = new HttpParams()
    .set('bot_id', '1')
    .set('workspace_id', workspace_id);
    this.spinner.show();
    this._cBS.getDocuments(params).subscribe((res:any)=>{
      this.documents = res;
      this.ValueSettingServiceService.setDocuments(res, this.workspace_id);
      this.loadUploadComponent();
      this.spinner.hide();
    },
    (error: any) => {
      this.documents = null;
      this.loadUploadComponent();
      this.spinner.hide();
      this.ValueSettingServiceService.setDocuments("null", this.workspace_id);
      this._toastr.error( error.error?.detail, 'Failed!',{
        timeOut: 2000,
      });
    }
    )
  }

  patchWorkspace(workspace_id:any){
    this.workspace_id = workspace_id;
    this.editButtonClicked = true
    const currentBot = this.bots.find(bot=> bot.workspace_id == this.workspace_id);
    this.ValueSettingServiceService.setEditFormValues(currentBot, workspace_id);
    debugger
    this.loadConfigComponent();
    // debugger
    // this.conversationalBotForm.get('botName')?.setValue(currentBot.workspace_name);
    // this.conversationalBotForm.get('LLM')?.setValue(currentBot.llm);
    // this.conversationalBotForm.get('llmApiKey')?.setValue(currentBot.llm_api_key);
    // this.conversationalBotForm.get('Embeddings')?.setValue(currentBot.embeddings);
    // this.conversationalBotForm.get('EmbeddingsApiKey')?.setValue(currentBot.embeddings_api_key);
    // this.conversationalBotForm.get('vectorDB')?.setValue(currentBot.vectordb);
    // this.conversationalBotForm.get('chatLimit')?.setValue(currentBot.chat_limit);
    // this.conversationalBotForm.get('prompt')?.setValue(currentBot.system_prompt);
  }
  setLLMDetails(){

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
    LLM: new FormControl(null, [Validators.required]),
    llmApiKey: new FormControl(''),
    Embeddings: new FormControl(null, [Validators.required]),
    EmbeddingsApiKey: new FormControl(''),
    vectorDB: new FormControl(null, [Validators.required]),
    chatLimit: new FormControl('', [Validators.required]),
    prompt: new FormControl('', [Validators.required]),
  });
  documentsForm = new FormGroup({
    document: new FormControl("", [Validators.required]),
  })
  WorkspaceNameForm = new FormGroup({
    name : new FormControl('')
  })
  get cBF() {
    return this.conversationalBotForm.controls
  }
  get pF(){
    return this.documentsForm.controls
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
    let flag = true;
  
    for (let i = 0; i < files.length; i++) {
      if (!files[i].name.toLowerCase().endsWith('.pdf')) {
        event.target.files = null;
        this.fileArray = [];
        flag = false;
        break; // Exit the loop immediately if a non-PDF file is found
      }
    }
  
    if (flag) {
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          this.fileArray.push(files.item(i));
        }
      }
    } else {
      this._toastr.error('Only PDF files are allowed', 'Failed!', {
        timeOut: 2000,
      });
    }
  }
  
  uploadFile(){
    if(this.workspace_id!=null){
      const formData = new FormData();
      for (let i = 0; i < this.fileArray.length; i++) {
        formData.append('documents', this.fileArray[i]);
      }
      formData.append('bot_id', "1");
      formData.append('workspace_id', String(this.workspace_id));
      this.spinner.show();
      this._cBS.uploadFile(formData).subscribe(
        (res:any)=>{
        this.spinner.hide();
        this.files = res;
        this.getDocuments(this.workspace_id);
        }, 
        (error: any) => {
          this.spinner.hide();
          this._toastr.error( error.error?.detail, 'Failed!',{
            timeOut: 3000,
          });
        }
    );
    }
    else{
      this._toastr.error('Please select an agent first','Failed!', {
        timeOut: 2000,
      });
    }
    // this.updateName();
  }

  createDocument(){
    if(this.workspace_id!=null){
      const formData = new FormData();
      formData.append('text', String(this.documentsForm.value.document));
      formData.append('bot_id', "1");
      formData.append('workspace_id', String(this.workspace_id));
      
      this._cBS.createDocument(formData).subscribe((res:any)=>{
        this.files = res;
        this.getDocuments(this.workspace_id);
        this.documentsForm.reset()
      });
      // this.updateName();
    }
    else{
      this._toastr.error( 'Please select an agent first','Failed!', {
        timeOut: 2000,
      });
    }
  }

  getName(){
    this.spinner.show()
    this._cBS.getName(this.workspace_id).subscribe((res:any)=>{
      this.spinner.hide()
      this.workspaceName = res.detail;
      // this.conversationalBotForm.get('botName')?.setValue(res.detail);
      this.name = res.detail;
      this.ValueSettingServiceService.setName(this.name);
    })
  }

  documentsUpdateCheck(){
    if(this.documentsForm.value.document == null || this.documentsForm.value.document == ""){
      return false
    }
    else{
      return true
    }

  }

  createWorkspace(){
    if(this.conversationalBotForm.valid){
      const formData = new FormData;
      formData.append('bot_id', "1");
      formData.append('workspace_name', String(this.conversationalBotForm.value.botName));
      formData.append('llm', String(this.conversationalBotForm.value.LLM));
      formData.append('llm_api_key', String(this.conversationalBotForm.value.llmApiKey));
      formData.append('embeddings', String(this.conversationalBotForm.value.Embeddings));
      formData.append('embeddings_api_key', String(this.conversationalBotForm.value.EmbeddingsApiKey));
      formData.append('prompt', String(this.conversationalBotForm.value.prompt));
      formData.append('vectordb', String(this.conversationalBotForm.value.vectorDB));
      formData.append('chat_limit', String(this.conversationalBotForm.value.chatLimit));
      this.spinner.show();
      this._cBS.createBot(formData).subscribe((res:any)=>{
        this.getBots();
        this.workspace_id = null;
        this.conversationalBotForm.reset();
        this.editButtonClicked = false;
        this.documents = null;
        this.spinner.hide();
      },
      (error: any) => {
        this._toastr.error( error.error?.detail, 'Failed!', {
          timeOut: 3000,
        });
        this.spinner.hide()
      }
      )
    }
    else {
      this.markFormGroupTouched(this.conversationalBotForm);
    }
  }

  updateWorkspace(){
    if(this.conversationalBotForm.valid){
      // const formData = new FormData;
      // formData.append('bot_id', "1");
      // formData.append('workspace_name', String(this.conversationalBotForm.value.botName));
      // formData.append('llm', String(this.conversationalBotForm.value.LLM));
      // formData.append('llm_api_key', String(this.conversationalBotForm.value.llmApiKey));
      // formData.append('embeddings', String(this.conversationalBotForm.value.Embeddings));
      // formData.append('embeddings_api_key', String(this.conversationalBotForm.value.EmbeddingsApiKey));
      // formData.append('prompt', String(this.conversationalBotForm.value.prompt));
      // formData.append('vectordb', String(this.conversationalBotForm.value.vectorDB));
      // formData.append('chat_limit', String(this.conversationalBotForm.value.chatLimit));
      this.updateName();
      this.updateLimit();
      this.updatePrompt();
      this.updatellm();
      this.updateEmbeddings();
      this.updatevectorDb();
    }
    else {
      this.markFormGroupTouched(this.conversationalBotForm);
    }
  }
  updatellm(){
    debugger
    const formData = new FormData();
    formData.append('bot_id', "1");
    formData.append('workspace_id', String(this.workspace_id));
    formData.append('llm', String(this.conversationalBotForm.value.LLM));
    this._cBS.updatellm(formData).subscribe((res:any)=>{
      this.getBots()
    })
  }
  updateEmbeddings(){
    debugger
    const formData = new FormData();
    formData.append('bot_id', "1");
    formData.append('workspace_id', String(this.workspace_id));
    formData.append('embeddings', String(this.conversationalBotForm.value.Embeddings));
    formData.append('embeddings_api_key', String(this.conversationalBotForm.value.EmbeddingsApiKey));
    this._cBS.updateEmbeddings(formData).subscribe((res:any)=>{
      this.getBots()
      this.workspace_id = null;
      this.conversationalBotForm.reset();
      this.editButtonClicked = false;
      this.documents = null;

    })
  }
  updatevectorDb(){
    debugger
    const formData = new FormData();
    formData.append('bot_id', "1");
    formData.append('workspace_id', String(this.workspace_id));
    formData.append('vectordb', String(this.conversationalBotForm.value.vectorDB));
    this._cBS.updatevectorDb(formData).subscribe((res:any)=>{
      this.getBots()
      this.workspace_id = null;
      this.conversationalBotForm.reset();
      this.editButtonClicked = false;
      this.documents = null;
    })
  }
  updateName(){
    debugger
    const formData = new FormData();
    formData.append('bot_id', "1");
    formData.append('workspace_id', String(this.workspace_id));
    formData.append('workspace_name', String(this.conversationalBotForm.value.botName));
    this.spinner.show();
    this._cBS.updateName(formData).subscribe((res:any)=>{
      this.getBots()
      this.spinner.hide();
    })
  }

  updateLimit(){
    debugger
    const formData = new FormData();
    formData.append('bot_id', "1");
    formData.append('workspace_id', String(this.workspace_id));
    formData.append('chat_limit', String(this.conversationalBotForm.value.chatLimit));
    this.spinner.show();
    this._cBS.updateLimit(formData).subscribe((res:any)=>{
      this.getBots()
      this.spinner.hide();
    })
  }
  updatePrompt(){
    debugger
    const formData = new FormData();
    formData.append('bot_id', "1");
    formData.append('workspace_id', String(this.workspace_id));
    formData.append('system_prompt', String(this.conversationalBotForm.value.prompt));
    this.spinner.show();
    this._cBS.updatePrompt(formData).subscribe((res:any)=>{
      this.getBots();
      this.spinner.hide();
    })
  }

  getPrompt(){
    this.spinner.show();
    this._cBS.getPrompt(this.workspace_id).subscribe((res:any)=>{
      this.spinner.hide();
      this.documentsForm.get('document')?.setValue(res.detail);
    })
  }
  updateDocStatus(doc: any,event: any) {
    debugger
    const formData = new FormData;
    formData.append('bot_id', "1");
    formData.append('workspace_id', String(this.workspace_id));
    formData.append('document_id', String(doc.document_id))
    this.spinner.show()
    if(event.target.checked){
      this._cBS.enableDocument(formData).subscribe((res:any)=>{
        this.getDocuments(this.workspace_id);
        this.spinner.hide()
      })
    }
    else{
      this._cBS.disableDocument(formData).subscribe((res:any)=>{
        this.getDocuments(this.workspace_id);
        this.spinner.hide()
      })
    }
    // documentid
    // this.workspace_id
    // botid
  }

  submitForm() {
   
    
    if (this.conversationalBotForm.valid) {
      this.isButtonDisabled = true;
      const formData = new FormData();
      formData.append('botName', String(this.conversationalBotForm.value['botName']));
      formData.append('sessionTimeOut', String(this.conversationalBotForm.value['chatLimit']));
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

  loadUploadComponent(){
    this.default = false;
  }
  loadConfigComponent(){
    this.default = true;
  }
}
