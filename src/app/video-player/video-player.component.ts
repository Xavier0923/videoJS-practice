import { Component, ElementRef, Input, OnInit, ViewChild, Renderer2 } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @ViewChild('target', { static: true }) target!: ElementRef;
  // See options: https://videojs.com/guides/options
  @Input() options!: {
    aspectRatio: string,
    autoplay: boolean,
    sources: {
      src: string,
      type: string,
    }[],
    controls: boolean,
    playbackRates: number[]
  };

  player!: videojs.Player;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.player = videojs(this.target.nativeElement, this.options);
    // 刪除字母畫面
    const pictureInPicture = this.player.controlBar.getChild('pictureInPictureToggle')!;
    this.player.controlBar.removeChild(pictureInPicture)
    // 加入空白div
    const playbackbtn = this.player.controlBar.getChild('playbackRateMenuButton')!;
    const playbackindex = this.player.controlBar.children().indexOf(playbackbtn);
    this.player.controlBar.addChild('component', {style: 'flex: 1;'}, playbackindex);
    console.log(this.player.controlBar);
    this.player.ready(() => {
      console.log('asd')
    })
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

}
