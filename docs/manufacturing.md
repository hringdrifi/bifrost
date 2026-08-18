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

## Parts

| Part | Specification | Qty. per keyboard | Recommended supplier | Part number |
| --- | --- | ---: | --- | --- |
| Truss-head screw | M2 × 4 mm | 22 | [Wilco](https://wilco.jp/) | `FT-0204EB` |
| Screw | M1.4 × 5 mm | 3 | [Wilco](https://wilco.jp/) | `F-1450N-01` |
| Round female-to-female spacer | M2 × 5 mm | 8 | [Hirosugi](https://hirosugi.co.jp/) ([web shop](https://www.hirosugi-net.co.jp/)) | `ARB-2005E` |
| Nut | M2 | 2 | [Wilco](https://wilco.jp/) | `FNT-02N` |
| Thin nut | M1.4 | 3 | [Wilco](https://wilco.jp/) | `UNTD-014` |
| Bumpon / rubber foot | Ø7.9 × H2.2 mm | 8 | [Amazon](https://www.amazon.co.jp/) | `SJ5302` or `CS-01` |
| Switch | Gateron Low Profile hotswap | 49 | TBD | `KS-27 Gateron Low Profile` or `KS-33 Gateron Low Profile 2.0` |
| Stabilizer | Gateron Low Profile, plate-mounted | 2 | TBD | `KS-57 Gateron Low Profile Plate Mounted Stabilizer` |
| Trackball ball | 25 mm | 1 | TBD | — |
| Trackball bearing | ID1.5 × OD4 × W2 mm | 3 | TBD | Minebea `DDL-415ZZ` |
| Lithium-polymer battery | Single cell (3.7 V nominal), with protection circuit; maximum dimensions: 6 mm thick × 35 mm wide × 55 mm high | 2 | TBD | TBD |
| Main PCB–battery wire harness | Two-conductor; inline connection between 75 mm male and female PicoBlade (1.25 mm pitch, 2 pin) pigtails | 2 | Molex | `2181110200` + `2181120200` |
| Left main PCB–left thumb-cluster PCB wire harness | Six-conductor; inline connection between 75 mm male and female PicoBlade (1.25 mm pitch, 6 pin) pigtails | 1 | Molex | `2181110600` + `2181120600` |
| Right main PCB–right thumb-cluster PCB wire harness | Five-conductor; inline connection between 75 mm male and female PicoBlade (1.25 mm pitch, 5 pin) pigtails | 1 | Molex | `2181110500` + `2181120500` |
| Right main PCB–trackball PCB wire harness | Six-conductor; inline connection between 75 mm male and female PicoBlade (1.25 mm pitch, 6 pin) pigtails | 1 | Molex | `2181110600` + `2181120600` |

> Direct contact between aluminium plates and brass screws or female-to-female spacers can accelerate corrosion of the aluminium if moisture or salt is present. This is not normally significant in a dry indoor environment, but use stainless-steel fasteners where corrosion resistance is a priority.

Place the PicoBlade connector in each harness as an inline disconnect, not on either PCB. `218111` is a male-to-pigtail and `218112` a female-to-pigtail pre-assembled cable; connect their blunt wire ends to the respective PCBs. Each harness uses one 75 mm male and one 75 mm female pigtail, the shortest available length. The battery harnesses use 2-pin connectors. Confirm connector mating, pin count, and pinout against the actual parts and PCB design data before ordering.

### Lithium-polymer battery notice and disclaimer

Lithium-polymer batteries can overheat, catch fire, or rupture if short-circuited, overcharged, physically damaged, or improperly charged. This reference does not warrant the safety or compatibility of any battery, charger, harness, or completed product; builders and users are responsible for assembly, use, charging, storage, and disposal.

- Charge through the on-board charging circuit. Do not connect an external charger directly to the battery or harness; use protected single-cell batteries.
- Do not use or charge batteries that are swollen, damaged, unusually hot, or emitting an odour. Dispose of them according to the battery manufacturer's instructions and local rules.
- Do not charge near combustible materials, while asleep, or while the battery cannot be supervised. Verify polarity and wiring before connecting.

## Case fabrication

Manufacture the following parts by **SLA resin 3D printing**:

| Part | File | Qty. per keyboard |
| --- | --- | ---: |
| Left-hand case | `bifrost_left_case.step` | 1 |
| Right-hand case | `bifrost_right_case.step` | 1 |
| Trackball case | `bifrost_trackball_case.step` | 1 |
| Power-switch knob (two-knob joined model) | `bifrost_switch_knob.step` | 1 model (2 knobs) |

The power-switch knobs are too small to manufacture individually, so the STEP file contains two knobs joined as one 3D-printing model. Separate the two knobs after printing.

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
| Manufacturing files | Use the Gerber ZIP, BOM, and pick-and-place files in the table below for the main PCBs |

### Main-PCB fabrication and assembly data

One keyboard requires one left main PCB and one right main PCB. For JLCPCB assembly, upload the matching Gerber ZIP, BOM CSV, and pick-and-place CSV for each PCB. `LCSC Part #` in the BOM is the JLCPCB/LCSC component number.

| PCB | Gerber ZIP | BOM | Pick-and-place |
| --- | --- | --- | --- |
| Left main PCB | [`bifrost_left.zip`](../pcb/left_kicad/production/bifrost_left.zip) | [`bom.csv`](../pcb/left_kicad/production/bom.csv) | [`positions.csv`](../pcb/left_kicad/production/positions.csv) |
| Right main PCB | [`bifrost_right.zip`](../pcb/right_kicad/production/bifrost_right.zip) | [`bom.csv`](../pcb/right_kicad/production/bom.csv) | [`positions.csv`](../pcb/right_kicad/production/positions.csv) |

The following application-specific selections in the current BOM deserve particular attention:

| Reference | Selected part | JLCPCB/LCSC Part # | Note |
| --- | --- | --- | --- |
| J1 | Korean Hroparts `TYPE-C-31-M-12` | `C165948` | USB Type-C receptacle matching the board's `HRO_TYPE-C-31-M-12` footprint |
| L1 | Murata `LQM18FN100M00D` | `C86083` | 10 µH, 0603; nRF52840 DC/DC inductor |
| F1 | BHFUSE `BSMD1206-100-16V` | `C883131` | 1 A hold PTC |
| D2 | Guangdong Hottech `1N5819WS` | `C191023` | SOD-323 Schottky diode |

For all other assembled components, use the exact part number in the linked BOM CSV. Switches, batteries, harnesses, and other items absent from the CSV are sourced and assembled separately.

## Switch plates

The four switch plates may be made by laser cutting or as aluminium-core PCBs. Use **1.2 mm** material.

When ordering an aluminium-core PCB and using the aluminium face as the top surface, **mirror the plate artwork before fabrication**.

- Recommended manufacturer: [JLCPCB](https://jlcpcb.com/)
- Plate files: `bifrost_left_plate.step`, `bifrost_right_plate.step`, `bifrost_left_thumb_plate.step`, and `bifrost_right_thumb_plate.step`

## Still to be specified

- PCB order specifications listed above
- Assembly data and component sourcing links for the thumb-cluster and trackball PCBs
- Manufacturing-export revision identifiers

## Related documents

- [Japanese version](manufacturing.ja.md)
- A separate build guide will cover soldering, mechanical assembly, and firmware flashing.
