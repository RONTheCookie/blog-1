{"title": "BTW, I use Arch", "date": "28/01/2019"}

I recently bought a new laptop to replace my current laptop, which is what I do all of my work on.
The laptop has good specs for gaming, and it came with Windows 10 installed by default.

> Before you read, know this: before I got this new laptop, I was using Ubuntu on my primary laptop, and I was renting an Ubuntu VPS where I did a lot from the command line, so I did have prior GNU/Linux experience.

I played a few different games on my new laptop including Just Cause 3 before a friend of mine
tried to convince me to switch to GNU/Linux. I told him as much as I would like to switch to GNU/Linux, gaming on GNU/Linux
just isn't as good as gaming on Windows, and there would probably be a noticeable difference in performance.

He then bought Just Cause 3 and played it on GNU/Linux with a 1050 Ti, and the performance was good, so I did some
research, crunched the numbers and decided to switch to GNU/Linux.

Originally I was going to install Ubuntu again, but then I thought it was time for a change, so I installed [Manjaro](https://manjaro.org/). Ha, just kidding, when I booted into the Manjaro installer it panicked and crashed.

So, I installed Arch GNU/Linux. It was fun to set everything up myself from the partitions to the desktop environment, and
it didn't take very long either. 

## Problems that arised during installation

### WiFi
During the installation I could not get my laptop to connect to the internet using WiFi.
I could've used an ethernet cable to install the packages and then fix it afterwards, but no, I don't have an ethernet cable.
The Arch Wiki was very helpful but I still couldn't connect. Thankfully, the nice people over at the Discord GNU/Linux community could.

### GPU
For some reason, my discreet graphics card was always on. No matter what I was doing. One tab open in Chrome? REEE LET'S USE THE NVIDIA GPU! One terminal window open, literally doing nothing? REEEEE LET'S WASTE ALL OF THE BATTERY LIFE!
The aforementioned friend of mine and I tried to debug this for hours. I ended up using a [custom program written in Rust](https://github.com/ronthecookie/bbswitch-dan) binded to Win+G to manually toggle the discreet graphics card.

### Increased battery usage and laptop temperature
I'm not sure if this was a problem when I was using Windows too, but I'm including it anyway. My laptop's battery was being drained extremely quickly. I probably couldn't have fixed this if I were on Windows. I fixed this by disabling the GPU by default (see above), decreasing my brightness from 100% to 65%, disabling most of my CPU cores (I didn't need that many) and installing [TLP](https://wiki.archlinux.org/index.php/TLP). Now my battery works like a charm.

## Desktop Environment

When I installed Arch, I installed the [KDE Plasma](https://wiki.archlinux.org/index.php/KDE) desktop environment. I was used to it, as it is what I used on my previous laptop with Ubuntu. The performance was normal, what you could expect from the specs I have (which are pretty good). But I decided I wanted to give the [i3 window manager](https://wiki.archlinux.org/index.php/i3) a try. I am so glad I did. i3 is such a nice environment to do all of my work in, and it is all configurable. Not to mention blazing fast! For anyone using any GNU/Linux distro, I strongly recommend giving i3 a try.

## Conclusion

In the end, I am so glad I replaced the proprietary Windows spyware with a free, DIY GNU/Linux distro. It took a couple of days to configure everything but the benefits of using free software far outweigh the issues I experienced during installation. Everything works now, and I can easily install new packages, update packages and develop software. As for the gaming, well I've yet to try that, but you can expect a blog post about that soon.

*Here's a picture of my current desktop (open in new tab)*  
![My desktop](https://i.imgur.com/DevdzKs.jpg "450x300")
