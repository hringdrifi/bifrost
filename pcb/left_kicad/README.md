# Bifrǫst left KiCad design

KiCad source files for the left half of Bifrǫst.

## Status

This is an **incomplete and unverified work in progress**. Do not order boards or rely on this design without independently reviewing the schematic, layout, footprints, mechanical fit, and electrical connections.

The project was initially created from a Smiðr export, then received substantial additional modifications. It is no longer an unmodified Smiðr export.

## Contents

| Design | Purpose |
| --- | --- |
| `bifrost_left.kicad_pro` / `.kicad_sch` / `.kicad_pcb` | Left main PCB |
| `bifrost_left_plate.kicad_pro` / `.kicad_pcb` | Left main switch plate |
| `bifrost_left_thumb.kicad_pro` / `.kicad_sch` / `.kicad_pcb` | Left thumb-cluster PCB |
| `bifrost_left_thumb_plate.kicad_pro` / `.kicad_pcb` | Left thumb-cluster switch plate |
| `smidr.pretty/` | Project footprint library |
| `local.kicad_sym` | Project symbol library |

## Electrical design note

The switch design uses **direct GPIO connections**. Each switch is connected directly between its assigned GPIO net and GND; **there is no diode connected to each switch**.

## Libraries

`fp-lib-table` and `sym-lib-table` configure the project libraries. Keep `smidr.pretty/` and `local.kicad_sym` with this project when opening it in KiCad.
