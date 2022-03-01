import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { Member } from 'src/app/models/member';
import { MemberService } from '../../services/members.service';
import { Photo } from '../../models/Photo';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  member!: Member;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
      {
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
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

  loadMember() {
    let username = this.route.snapshot.paramMap.get('username');
    if (username != null)
      this.memberService.getMember(username).subscribe((member) => {
        this.member = member;
        this.galleryImages = this.getImages();
      });
  }
}
