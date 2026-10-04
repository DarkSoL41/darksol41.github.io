/* Project catalog. To add a project, copy one object and change the fields.
   shots: { src, cap } for a screenshot, or { gen, seed, cap } for a drawn placeholder.
   cover: optional image for cards. url: project page with the download.
   DEMO NOTE: texts come from the itch.io pages; images are hot-linked from itch.io;
   no versions or dates are shown on the site; array order = display order (newest first). Old placeholder catalog: data.placeholders.js */
window.SITE = {
  author: "DarkSoL41",
  releases: "https://darksol41.itch.io/",
  kinds: {
    editor: "Level editor",
    port: "Port",
    remake: "Remake",
    tool: "Utility",
    mods: "Levels & mods"
  },
  platforms: {
    dos:   { name: "MS-DOS", cpu: "x86 real mode · EGA/VGA" },
    zx:    { name: "ZX Spectrum", cpu: "Zilog Z80 · 48K/128K" },
    nes:   { name: "NES / Famicom", cpu: "Ricoh 2A03 · PPU" },
    amiga: { name: "Amiga", cpu: "Motorola 68000 · OCS" }
  },
  status: {
    stable: { label: "Stable", cls: "st-stable" },
    beta:   { label: "Beta", cls: "st-beta" },
    wip:    { label: "In progress", cls: "st-wip" }
  }
};

const ITCH = "https://img.itch.zone/";

window.PROJECTS = [
  {
    id: "gods-level-editor",
    title: "Gods Level Editor",
    kind: "editor",
    platform: "dos",
    status: "stable",
    ai: "Claude",
    url: "https://darksol41.itch.io/gods-level-editor",
    cover: ITCH + "aW1nLzMwNTA4NzI5LnBuZw==/original/5E8CI3.png",
    tagline: "A level editor for the DOS version of Gods (The Bitmap Brothers, 1992). It edits everything a level is made of: tiles, walls and ladders, objects, triggers, puzzles, monsters, switches, doors, trapdoors, moving blocks, teleports, messages and hints.",
    summary: "Browser editor for Gods levels: tiles, triggers, puzzles, monsters, machines.",
    shots: [
      { src: ITCH + "aW1hZ2UvNTA5NjExMC8zMDUwODczNC5wbmc=/original/YgWN6L.png", cap: "Gods Level Editor · screenshot 1" },
      { src: ITCH + "aW1hZ2UvNTA5NjExMC8zMDUwODczNy5wbmc=/original/dSGioR.png", cap: "Gods Level Editor · screenshot 2" },
      { src: ITCH + "aW1hZ2UvNTA5NjExMC8zMDUwODc0MC5wbmc=/original/LacYoe.png", cap: "Gods Level Editor · screenshot 3" }
    ],
    about: [
      "The whole editor is one HTML file. It runs in the browser, needs no installation and sends nothing anywhere. In Chrome or Edge it saves straight into the game folder; the first time a map is saved, the untouched originals are copied to an EDITOR_BACKUP folder.",
      "Every cell of a Gods map has a picture and a collision value: empty, wall, ladder or a trigger number. When the player overlaps a trigger cell, the game runs that trigger: it spawns monsters, checks a puzzle, sets a checkpoint, moves a block or starts the guardian. The editor shows these links as arrows on the map and describes each puzzle in a plain sentence."
    ],
    features: [
      "Five tools: tiles, solids, triggers, objects and select",
      "All 253 triggers and 100 puzzles, with conditions, actions and messages",
      "Monsters: ground patrols, flying waves, walker gangs, flyer gangs",
      "Machines: switches, trapdoors, moving blocks, teleports",
      "Status-bar messages and hint texts",
      "Check tab that finds inconsistencies the game would handle badly",
      "Undo and redo, built-in guide"
    ],
    steps: [
      "Open <code>gods_editor.html</code> in the browser.",
      "Press <b>Open game folder</b> and pick the folder with your copy of the game.",
      "Choose a map: each of the four levels has two, A and B.",
      "Edit, then press <b>Save level</b> or <code>Ctrl+S</code> and start the game in DOSBox."
    ],
    spec: [
      ["Game", "Gods (The Bitmap Brothers, DOS, 1992)"],
      ["Files", "PLEVnX.MAP, PALFILS.*"],
      ["Map size", "128 × 64 cells, 32 × 16 px each"],
      ["Code", "HTML / JavaScript"],
      ["Systems", "Chrome, Edge; Firefox and Safari with manual copy"]
    ],
    downloads: [
      { name: "Browser (HTML)", file: "gods-level-editor.zip", href: "downloads/gods-level-editor.zip" }
    ],
    legal: "Contains no game data. You need your own copy of the DOS release of Gods. Not affiliated with The Bitmap Brothers or Rebellion."
  },
  {
    id: "lunar-ball-remake",
    title: "Lunar Ball Remake",
    kind: "remake",
    platform: "nes",
    status: "stable",
    ai: "Claude",
    url: "https://darksol41.itch.io/lunar-ball-remake",
    cover: ITCH + "aW1nLzI5NjUwODc4LnBuZw==/original/A%2BLoUd.png",
    tagline: "A fan-made remake of the NES billiards game Lunar Ball, written in C++20 and SDL2, with a launcher and a level editor. The game logic is ported 1:1 from the original and checked against a tracing emulator.",
    summary: "NES billiards remake in C++ / SDL2 with a launcher and a level editor.",
    shots: [
      { src: ITCH + "aW1hZ2UvNDk1NTUwNS8yOTY1MDg4MC5wbmc=/original/Ke31Fu.png", cap: "Lunar Ball Remake · screenshot 1" },
      { src: ITCH + "aW1hZ2UvNDk1NTUwNS8yOTY1MDg4My5wbmc=/original/fNDthv.png", cap: "Lunar Ball Remake · screenshot 2" },
      { src: ITCH + "aW1hZ2UvNDk1NTUwNS8zMDU0MDYzNi5wbmc=/original/aYUVpO.png", cap: "Lunar Ball Remake · screenshot 3" },
      { src: ITCH + "aW1hZ2UvNDk1NTUwNS8zMDU0MDY0MS5wbmc=/original/lJCFzh.png", cap: "Lunar Ball Remake · screenshot 4" }
    ],
    about: [
      "The game logic is ported 1:1 from the original and verified against a tracing-emulator oracle. The audio is an emulation of the NES 2A03 sound chip, quieter than the original by default.",
      "The launcher holds all the settings: keyboard and gamepad bindings for two players, a NES channel mixer with a sound test, window and scaling options, and NES palettes with a live preview.",
      "In the level editor you do not paint tiles. You draw the table the way the original game describes it, with rail cells, felt, pockets and balls, and the editor builds the rail graphics and the bounce map with a port of the game's own table builder. An edited table looks and plays like an original one."
    ],
    features: [
      "1P, 2P and vs CPU, keyboard and gamepads, everything rebindable",
      "Launcher with controls, audio, video, colours and game pages",
      "NES palettes: Classic, NTSC TV, black & white or any emulator .pal file",
      "Pixel shape, scaling, overscan and scanline options; fast-forward and screenshots",
      "Level editor with ten tools, mirror drawing, copy and paste, undo and redo",
      "Test play inside the editor and a Check that finds unreachable balls and hidden pockets",
      "The 60 original tables are always kept in levels_original.dat"
    ],
    steps: [
      "Download the archive and unpack it anywhere.",
      "Run <code>launcher.exe</code>, change what you like and press <b>PLAY</b>. The game also runs on its own.",
      "Aim with the arrow keys and shoot with <code>X</code>.",
      "Run <code>editor.exe</code> to draw tables; <code>F5</code> test-plays the level."
    ],
    spec: [
      ["Original", "Lunar Ball (Compile / Pony Canyon, 1985)"],
      ["Version", "1.1"],
      ["Code", "C++20 / SDL2"],
      ["Audio", "2A03 emulation"],
      ["Levels", "60, editable"],
      ["Systems", "Windows"]
    ],
    downloads: [
      { name: "Windows", file: "lunar-ball-remake.zip", href: "downloads/lunar-ball-remake.zip" }
    ],
    legal: "Unofficial fan remake, not affiliated with Compile or Pony Canyon. Contains graphics and level layouts from the original game, included for preservation only."
  },
  {
    id: "tetcolor-remake",
    title: "Tetcolor Remake",
    kind: "remake",
    platform: "dos",
    status: "stable",
    ai: "Claude",
    url: "https://darksol41.itch.io/tetcolor-remake",
    cover: ITCH + "aW1nLzI5Mjg5NDIxLnBuZw==/original/3wPtPc.png",
    tagline: "An exact clone of TETCOLOR (Sergey Sotnikov, Tula, 1991) for modern Windows: the same coordinates, sounds, scoring and animations, in a single .exe that needs no DOSBox.",
    summary: "Exact clone of the 1991 puzzle game for modern Windows, in one .exe.",
    shots: [
      { src: ITCH + "aW1hZ2UvNDg5OTQxNy8yOTI4OTQyMy5wbmc=/original/Q8ed6R.png", cap: "Tetcolor Remake · screenshot 1" },
      { src: ITCH + "aW1hZ2UvNDg5OTQxNy8yOTI4OTQyNi5wbmc=/original/LNLo6A.png", cap: "Tetcolor Remake · screenshot 2" },
      { src: ITCH + "aW1hZ2UvNDg5OTQxNy8yOTI4OTQ5NC5wbmc=/original/Zxwu9x.png", cap: "Tetcolor Remake · screenshot 3" }
    ],
    about: [
      "Coloured pieces of three cubes fall into a well seven cells wide. Three or more cubes of the same colour in a row, in any direction, burn away, everything above collapses, and what falls may line up into a new combination.",
      "The defaults reproduce the 1991 original. Behaviour was never guessed: it was checked with an 8086 interpreter across 6825 collision cases, 390 rotations, 300 generator seeds and 250 board positions, and reference frames from DOSBox match pixel for pixel.",
      "Every new feature stays off until you turn it on in the F1 menu."
    ],
    features: [
      "Single executable: no DOSBox, installer or extra libraries",
      "Adjustable volume instead of a full-blast PC speaker",
      "Bot with hints and autoplay (bot games do not count for high scores)",
      "Record and replay games: a 220-piece game takes 7 KB",
      "Fast animation mode and window scaling from 1x to 4x"
    ],
    steps: [
      "Download the archive and run <code>tetcolor.exe</code>.",
      "Move with <code>4</code> / <code>6</code>, rotate with <code>8</code> / <code>5</code>, drop with <code>Space</code>. Arrow keys work too.",
      "Press <code>F1</code> for settings and <code>F2</code> for recorded games."
    ],
    spec: [
      ["Original", "TETCOLOR, Sergey Sotnikov, 1991"],
      ["Original tech", "Turbo Pascal, Borland BGI"],
      ["Systems", "Windows"],
      ["Size", "86 kB"]
    ],
    downloads: [
      { name: "Windows", file: "tetcolor-remake.zip", href: "downloads/tetcolor-remake.zip" }
    ],
    legal: "Unofficial fan remake. The original program is not included. The rights to TETCOLOR belong to its author, Sergey Sotnikov."
  },
  {
    id: "popcorn-level-editor",
    title: "PopCorn Level Editor",
    kind: "editor",
    platform: "dos",
    status: "stable",
    ai: "Claude",
    url: "https://darksol41.itch.io/popcorn-level-editor",
    cover: ITCH + "aW1nLzI5MTU3MzQ2LnBuZw==/original/Q%2Bq3ZF.png",
    tagline: "A standalone Windows editor for the 49 levels of PopCorn. It reads levels straight out of POPCORN.EXE and writes them back, so you can build a level and actually play it.",
    summary: "Edits the 49 PopCorn levels and patches them back into POPCORN.EXE.",
    shots: [
      { src: ITCH + "aW1hZ2UvNDg3OTIzOS8yOTE1NzM1MC5wbmc=/original/lsEI6A.png", cap: "PopCorn Level Editor · screenshot 1" },
      { src: ITCH + "aW1hZ2UvNDg3OTIzOS8yOTE1NzM1Ny5wbmc=/original/HJSp73.png", cap: "PopCorn Level Editor · screenshot 2" },
      { src: ITCH + "aW1hZ2UvNDg3OTIzOS8yOTE1NzM2MC5wbmc=/original/k9ueAB.png", cap: "PopCorn Level Editor · screenshot 3" }
    ],
    about: [
      "The editor works with the .PPC level banks of the original POPGEN editor and with the level bank packed inside POPCORN.EXE. The record header (brick count, teleport positions) is recalculated on export.",
      "The game is packed with Microsoft EXEPACK, so the patched .exe has to keep exactly the same size. Before saving, the editor unpacks its own output and compares it byte for byte; if the check fails, nothing is written."
    ],
    features: [
      "Native Win32, statically linked: no .NET, no Python, no DLLs",
      "Graphics mode with the game's block sprites, or a schematic mode with codes",
      "Import from and export to POPCORN.EXE",
      "Open and save .PPC level banks",
      "Interface in English and Russian",
      "Source code and a full format description included"
    ],
    steps: [
      "Run <code>PopCornEditor.exe</code>.",
      "<code>File → Import levels from POPCORN.EXE...</code> and pick the game's executable.",
      "Draw your levels: left button paints, right button erases, <code>F1</code>–<code>F10</code> pick objects.",
      "<code>File → Export (patch) to POPCORN.EXE...</code> and choose a name for the patched copy."
    ],
    spec: [
      ["Game", "PopCorn (Frédérick Raynal, 1988)"],
      ["Levels", "49, 14 × 12 cells"],
      ["Formats", ".PPC, POPCORN.EXE (EXEPACK)"],
      ["Code", "C++17, Win32"],
      ["Systems", "Windows"]
    ],
    downloads: [
      { name: "Windows x64", file: "popcorn-level-editor.zip", href: "downloads/popcorn-level-editor.zip" }
    ],
    legal: "The game is not included: you need your own POPCORN.EXE. The editor only embeds the small block sprites to draw the field."
  },
  {
    id: "trashit-level-editor",
    title: "Trash It Level Editor",
    kind: "editor",
    platform: "dos",
    status: "beta",
    ai: "Claude",
    url: "https://darksol41.itch.io/trashit-level-editor",
    cover: ITCH + "aW1nLzI4NTgwMTMzLnBuZw==/original/qAXpu4.png",
    tagline: "A browser-based level editor for the DOS game Trash It. It opens the binary level files, lets you edit bricks, objects and durability, and exports files the original game accepts.",
    summary: "Browser editor for Trash It levels: bricks, objects, sprites, backgrounds.",
    shots: [
      { src: ITCH + "aW1hZ2UvNDc5MjMzMy8yODU4MDEzNS5wbmc=/original/VxsI4T.png", cap: "Trash It Level Editor · screenshot 1" },
      { src: ITCH + "aW1hZ2UvNDc5MjMzMy8yODU4MDE0Mi5wbmc=/original/Xg4a8Y.png", cap: "Trash It Level Editor · screenshot 2" },
      { src: ITCH + "aW1hZ2UvNDc5MjMzMy8yODU4MDE4Mi5wbmc=/original/XPMTKR.png", cap: "Trash It Level Editor · screenshot 3" }
    ],
    about: [
      "Trash It keeps each level in several binary files (.G2, .G2R, .I, .WAM, .PAL, .COL, .OB, .SPR, .SCN). The editor reads them in the browser and draws the level the way the game does, with the sprites and palettes from your files.",
      "Some object types have engine quirks that can stop a level from loading. The editor shows the known ones in the info panel and defaults to the safer settings."
    ],
    features: [
      "One HTML file: no install, no server, nothing is uploaded",
      "Inspect every brick and object: durability, material, type fields",
      "Move, add and delete bricks and objects",
      "Sprite and background viewers",
      "Exports only the files that changed",
      "Interface in English and Russian"
    ],
    steps: [
      "Open <code>TrashIt_Level_Editor.html</code> in Chrome, Firefox or Edge.",
      "Drop in the level files from the game's <code>LEVELS</code> and <code>SPR</code> folders.",
      "Browse in View mode, then switch to Edit mode to make changes.",
      "Export, and replace all listed files together. Keep a backup of the originals."
    ],
    spec: [
      ["Game", "Trash It (Rage Software / GT Interactive, 1997)"],
      ["Level files", ".G2 .G2R .I .WAM .PAL .COL .OB .SPR"],
      ["Code", "HTML / JavaScript"],
      ["Systems", "Any desktop browser"]
    ],
    downloads: [
      { name: "Browser (HTML)", file: "trashit-level-editor.zip", href: "downloads/trashit-level-editor.zip" }
    ],
    legal: "Game files are not included: you need your own copy of Trash It. All level data and sprites are read from it."
  },
  {
    id: "putup-level-editor",
    title: "Putup Level Editor",
    kind: "editor",
    platform: "dos",
    status: "stable",
    ai: "Claude",
    url: "https://darksol41.itch.io/putup-level-editor",
    cover: ITCH + "aW1nLzI4NTM3Nzg3LnBuZw==/original/DiZR4o.png",
    tagline: "A single-file HTML level editor for Putup, a DOS game from 1991. It opens PUTUP7.DAT, shows every level with the game's own tiles and saves a new .DAT for the game folder.",
    summary: "Single-file browser editor for the levels in PUTUP7.DAT.",
    shots: [
      { src: ITCH + "aW1hZ2UvNDc4NTU5NS8yODUzNzc5MC5wbmc=/original/vkRNMW.png", cap: "Putup Level Editor · screenshot 1" },
      { src: ITCH + "aW1hZ2UvNDc4NTU5NS8yODUzNzc5NC5wbmc=/original/y%2Fb4oN.png", cap: "Putup Level Editor · screenshot 2" }
    ],
    about: [
      "Each level record in PUTUP7.DAT is 184 bytes: an 8-byte header with the exit and the two enemies, and a 16 × 11 tile map.",
      "Some things are hardcoded in the game and not in the file: the player always starts at row 1, column 1, there are always two enemies, and the number of balls depends only on the level number."
    ],
    features: [
      "Paint the 16 × 11 tile map for any of the ~51 level slots",
      "Place both enemies and choose their type",
      "Place the exit spawn point",
      "Undo up to 50 steps with Ctrl+Z",
      "Interface in English and Russian"
    ],
    steps: [
      "Open <code>putup_level_editor_v1.0.html</code> in your browser.",
      "Click Open .DAT and select <code>PUTUP7.DAT</code> from your copy of the game.",
      "Pick a level and edit it.",
      "Click Save .DAT and put <code>PUTUP7_edited.DAT</code> back into the game folder."
    ],
    spec: [
      ["Game", "Putup (DOS, 1991)"],
      ["File", "PUTUP7.DAT, 184 bytes per level"],
      ["Map size", "16 × 11 tiles"],
      ["Systems", "Any modern browser"]
    ],
    downloads: [
      { name: "Browser (HTML)", file: "putup-level-editor.zip", href: "downloads/putup-level-editor.zip" }
    ],
    legal: "The game is not included: you need your own PUTUP7.DAT. The editor only embeds a small set of sprites to draw the map."
  },
  {
    id: "sos-level-editor",
    title: "Sink or Swim Level Editor",
    kind: "editor",
    platform: "dos",
    status: "stable",
    ai: "Claude",
    url: "https://darksol41.itch.io/sos-level-editor",
    cover: ITCH + "aW1nLzI4NTM3NTcyLnBuZw==/original/mQjFsz.png",
    tagline: "A browser-based level editor for Sink or Swim (DOS, 1993). It edits MAPxx.DAT files tile by tile and can patch GAME.EXE to move or add switch-to-conveyor links.",
    summary: "Edits MAPxx.DAT maps and patches switch-to-conveyor links in GAME.EXE.",
    shots: [
      { src: ITCH + "aW1hZ2UvNDc2MTM4MC8yODM4OTEzNi5wbmc=/original/uImaqe.png", cap: "Sink or Swim Level Editor · screenshot 1" },
      { src: ITCH + "aW1hZ2UvNDc2MTM4MC8yODM4OTEzNy5wbmc=/original/%2FG3avI.png", cap: "Sink or Swim Level Editor · screenshot 2" }
    ],
    about: [
      "Everything was worked out from the game's files and a disassembly of its executable; no official documentation or source code was used.",
      "In the original game a switch is tied to a conveyor through a lookup table compiled into GAME.EXE, per level. The editor shows these links on the map and can rewrite the table: moving a link is a 2-byte change, and adding a new one relocates the tables into an unused region of the EXE."
    ],
    features: [
      "Paint background tiles and place switches, conveyors, the exit and the cargo crate",
      "See which switch drives which conveyor",
      "Build a patched GAME.EXE with moved or new links",
      "Runs fully in the browser, nothing is uploaded",
      "Interface in English and Russian",
      "MECHANICS.md with the file formats and the patch algorithm"
    ],
    steps: [
      "Open <code>editor.html</code> in Chrome or Edge.",
      "Click Open MAPxx.DAT and select a level from your copy of the game.",
      "Paint tiles and objects, then save the map.",
      "For link editing, unpack your <code>GAME.EXE</code> with <code>upx -d</code> and load it into the editor."
    ],
    spec: [
      ["Game", "Sink or Swim (Odysseus Software / Zeppelin Games, 1993)"],
      ["Files", "MAPxx.DAT, GAME.EXE"],
      ["Map width", "10 tiles"],
      ["Code", "HTML / JavaScript"],
      ["Systems", "Chrome, Edge"]
    ],
    downloads: [
      { name: "Browser (HTML)", file: "sos-level-editor.zip", href: "downloads/sos-level-editor.zip" }
    ],
    legal: "The game, GAME.EXE and the level files are not included. The editor embeds the tilesets only to draw maps."
  },
  {
    id: "nicky-boom-level-editor",
    title: "Nicky Boom Level Editor",
    kind: "editor",
    platform: "dos",
    status: "stable",
    ai: "Claude",
    url: "https://darksol41.itch.io/nicky-boom-level-editor",
    cover: ITCH + "aW1nLzI4MTQwMzc5LnBuZw==/original/F8ibVD.png",
    tagline: "An unofficial level editor for Nicky Boom (Microids, DOS, 1992). Repaint the tile maps, move monsters and items, and export files that run in the original game under DOSBox.",
    summary: "Browser editor for Nicky Boom tile maps, monsters and items.",
    shots: [
      { src: ITCH + "aW1hZ2UvNDcyMTU4NC8yODE0MDQxNC5wbmc=/original/cZBjwd.png", cap: "Nicky Boom Level Editor · screenshot 1" },
      { src: ITCH + "aW1hZ2UvNDcyMTU4NC8yODE0MDQxNS5wbmc=/original/4TyybO.png", cap: "Nicky Boom Level Editor · screenshot 2" }
    ],
    about: [
      "The editor reads the tile maps (DECORn.CDG / .BLK), the object lists (POSITn.REF / REFn.REF) and the sprites (S0n.SPR / S1n.SPR) from your copy of the game, and exports them with the game's own sqx compression.",
      "The engine has a fixed-size object table: level 1 already uses all 409 slots. Moving, editing and deleting objects is safe; adding more than the original count is not, and the editor warns about it."
    ],
    features: [
      "Tiles mode: paint, erase, eyedropper, collision overlay, zoom",
      "Objects mode: place, drag and edit monsters and items",
      "In-game sprite previews for objects",
      "Export with real LZ compression, objects re-sorted by X automatically",
      "One HTML file, no install"
    ],
    steps: [
      "Open the editor in Chrome or Edge.",
      "Select the folder with your copy of Nicky Boom.",
      "Edit tiles or objects, then export the changed files.",
      "Copy them into the game folder and test in DOSBox."
    ],
    spec: [
      ["Game", "Nicky Boom (Microids, 1992)"],
      ["Files", "DECORn.CDG/.BLK, POSITn.REF, S0n/S1n.SPR"],
      ["Engine reference", "Gregory Montoir's nicky 0.2.0"],
      ["Systems", "Chrome, Edge"]
    ],
    downloads: [
      { name: "Browser (HTML)", file: "nicky-boom-level-editor.zip", href: "downloads/nicky-boom-level-editor.zip" }
    ],
    legal: "Game files are not included. You need a legally owned copy of Nicky Boom. Not affiliated with Microids."
  }
];
