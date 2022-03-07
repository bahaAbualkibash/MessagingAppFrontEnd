import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { Member } from 'src/app/models/member';
import { MemberService } from '../../services/members.service';
import { Photo } from '../../models/Photo';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/models/message';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  member!: Member;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  @ViewChild('memberTabs', { static: true }) memberTabs!: TabsetComponent;
  activeTab!: TabDirective;
  messages: Message[] = [];
  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.member = data['member'];
    });
    this.route.queryParams.subscribe((params) => {
      params['tab'] ? this.selectTab(params['tab']) : this.selectTab(0);
    });

    this.galleryOptions = [
      {
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
    this.galleryImages = this.getImages();
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (let index = 0; index < this.member.photos.length; index++) {
      imageUrls.push({
        small: this.member.photos[index]?.url,
        medium: this.member.photos[index]?.url,
        big: this.member.photos[index]?.url,
      });
    }
    return imageUrls;
  }

  loadMessages() {
    this.messageService
      .getMessageThread(this.member.username)
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.loadMessages();
    }
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
}
