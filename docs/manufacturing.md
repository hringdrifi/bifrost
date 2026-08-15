# Manufacturing reference

This document is a work in progress for manufacturing Bifrǫst. It covers procurement and fabrication requirements; assembly instructions will be published separately in a build guide.

> Availability, lead time, specifications, and ordering conditions at linked suppliers may change. Verify the current product page and specification before ordering. Prices are intentionally not listed here.

## Production scope

One keyboard requires five PCB designs:

1. Left main PCB
2. Right main PCB
3. Trackball PCB
4. Left thumb-cluster PCB
5. Right thumb-cluster PCB

The case and four switch plates are provided as STEP files in [`case/`](../case/). The PCB design sources are in [`pcb/`](../pcb/).

## Hardware

| Part | Specification | Qty. per keyboard | Recommended supplier | Part number |
| --- | --- | ---: | --- | --- |
| Truss-head screw | M2 × 4 mm | 22 | [Wilco](https://wilco.jp/) | `FT-0204EB` |
| Screw | M1.4 × 5 mm | 3 | [Wilco](https://wilco.jp/) | `F-1450N-01` |
| Round female-to-female spacer | M2 × 5 mm | 8 | [Hirosugi](https://hirosugi.co.jp/) ([web shop](https://www.hirosugi-net.co.jp/)) or [Wilco](https://wilco.jp/) | `ARB-2005E` |
| Nut | M2 | 2 | [Wilco](https://wilco.jp/) | `FNT-02N` |
| Thin nut | M1.4 | 3 | [Wilco](https://wilco.jp/) | `UNTD-014` |
| Bumpon / rubber foot | Ø7.9 × H2.2 mm | 8 | TBD | `SJ5302` |

## Case fabrication

Manufacture the following parts by **SLA resin 3D printing**:

| Part | File | Qty. per keyboard |
| --- | --- | ---: |
| Left-hand case | `bifrost_left_case.step` | 1 |
| Right-hand case | `bifrost_right_case.step` | 1 |
| Trackball case | `bifrost_trackball_case.step` | 1 |

- Recommended manufacturer: [JLC3DP](https://jlc3dp.com/)
- Manufacturing process: SLA resin
- Resin type, colour, and surface finish: **at the builder's discretion**
- Post-processing: **not required**
- Rubber feet: apply eight 3M `SJ5302` bump-ons during final assembly.

## PCB fabrication

- Recommended manufacturer: [JLCPCB](https://jlcpcb.com/)
- Required design count: **5 distinct PCBs** per keyboard

| PCB | Board thickness |
| --- | ---: |
| Left main PCB | **1.2 mm** |
| Right main PCB | **1.2 mm** |
| Left thumb-cluster PCB | **1.2 mm** |
| Right thumb-cluster PCB | **1.2 mm** |
| Trackball PCB | **1.6 mm** |

### Order specification — to be confirmed

Fill in the following before placing an order:

| Item | Requirement |
| --- | --- |
| Quantity per design | TBD |
| Layer count | 2 |
| Copper weight | 1 oz (35 µm) — verify for the trackball PCB |
| Solder mask colour | Builder's choice |
| Surface finish | TBD |
| Edge / panel requirements | TBD |
| Electrical test | TBD |
| Assembly service | TBD |
| Manufacturing files | TBD — Gerber archive(s) and, when applicable, BOM and pick-and-place files |

The PCB BOM will be added here when it is finalized.

### PCB BOM — placeholder

| PCB | BOM file | Status |
| --- | --- | --- |
| Left main PCB | TBD | Not yet published |
| Right main PCB | TBD | Not yet published |
| Trackball PCB | TBD | Not yet published |
| Left thumb-cluster PCB | TBD | Not yet published |
| Right thumb-cluster PCB | TBD | Not yet published |

## Switch plates

The four switch plates may be made by laser cutting or as aluminium-core PCBs. Use **1.2 mm** material.

When ordering an aluminium-core PCB and using the aluminium face as the top surface, **mirror the plate artwork before fabrication**.

- Recommended manufacturer: [JLCPCB](https://jlcpcb.com/)
- Plate files: `bifrost_left_plate.step`, `bifrost_right_plate.step`, `bifrost_left_thumb_plate.step`, and `bifrost_right_thumb_plate.step`

## Still to be specified

- PCB order specifications listed above
- PCB BOM and component sourcing links
- Manufacturing exports and revision identifiers

## Related documents

- [Japanese version](manufacturing.ja.md)
- A separate build guide will cover soldering, mechanical assembly, and firmware flashing.
