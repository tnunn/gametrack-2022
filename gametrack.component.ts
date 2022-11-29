import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { error } from 'util';
// declare function handleClientLoad(): any;
/* declare function createNewSpreadsheet(title: string): any;
declare function addRow(spreadsheetID: string, description: string, date: string, cb): any;
declare function updateRow(spreadsheetID: string, range: string, values: Array<string>, cb): any; */

@Component({
  selector: 'app-gametrack',
  templateUrl: './gametrack.component.html',
  styleUrls: ['./gametrack.component.css']
})

export class GametrackComponent implements OnInit {
  spreadsheetID = '';
  // private spreadsheetTab = 'Raw'; */

  rowRange = '';
  valueArray: Array<string> = [null, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', null];

  gtForm = new FormGroup({
    spreadsheetValue: new FormControl(''),
    description: new FormControl('')
  });

  goFull = false;

  // Stat fields
  ft0 = 0;
  ftm: number = 0;
  twoMiss = 0;
  twoMake: number = 0;
  threeMiss = 0;
  threeMake: number = 0;
  offReb = 0;
  defReb = 0;
  ast = 0;
  stl = 0;
  blk = 0;
  to = 0;
  pf = 0;
  pfd = 0;
  sblk = 0;

  total = 0;
  shotsTaken = 0;
  shotsMade = 0;
  ftTaken = 0;
  ftMade = 0;


  constructor(private toastr: ToastrService) {}

   async ngOnInit() {
     // Had to use async/await so it waits for the google authentication to occur;  used in the JS file functions also right now
     // await handleClientLoad();
  }

  // Used for Spreadsheet file integration but not required
  createSpreadsheet(title: string) {
    // createNewSpreadsheet(title);
  }

  /** Add new game entry row to existing spreadsheet */
   addGameToSpreadsheet() {
    var inputValue = this.gtForm.get('spreadsheetValue').value;
    var descr = this.gtForm.get('description').value;

    if (inputValue === '') {
      this.spreadsheetID = '11RaW4d_0L8UaTBj00AvZ1_vlJQEqm1r-vSAlNtSR3gs';  // Default spreadsheet ID for personal use
    }

    this.resetAllStats();
    let today: Date = new Date();
    let formattedDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

/*     addRow(this.spreadsheetID, descr, formattedDate, (response) =>  {
        // console.log(response.updates.updatedRange);
        this.rowRange = response.updates.updatedRange;
        this.toastr.success('Successfully created a new entry in the Stat Sheet for you', 'New Game', {});
    }); */
  }

  /** Update a row per the user initiated event */
   updateGameRow() {

      if (this.spreadsheetID === '') { // Do nothing
      } else {
/*         updateRow(this.spreadsheetID,
        this.rowRange, this.valueArray, (response) =>  {
          // console.log('Update response: ' + response);
        }); */
      }
    }

    clickFTMissed() {
      this.ft0 += 1;
      this.ftTaken += 1;
      this.valueArray[1] = this.ft0.toString();
      this.updateGameRow();
      this.toastr.error('MISSED', 'Free Throw', {
      });
    }
    clickFTMade() {
      this.ftm += 1;
      this.total += 1;
      this.ftTaken += 1;
      this.ftMade += 1;
      this.valueArray[2] = this.ftm.toString();
      this.updateGameRow();
      this.toastr.success('Sinks it!  ' + this.total + ' Points', 'Free Throw', {
      });
    }
    click2PTMiss() {
      this.twoMiss += 1;
      this.shotsTaken += 1;
      this.valueArray[3] = this.twoMiss.toString();
      this.updateGameRow();
      this.toastr.error('MISSED', '2 Pointer', {
      });
    }
    click2PTMake() {
      this.twoMake += 1;
      this.total += 2;
      this.shotsTaken += 1;
      this.shotsMade += 1;
      this.valueArray[4] = this.twoMake.toString();
      this.updateGameRow();
      this.toastr.success('Hits it! ' + this.total + ' Points', '2 Pointer', {
      });
    }
    click3PTMiss() {
      this.threeMiss += 1;
      this.shotsTaken += 1;
      this.valueArray[5] = this.threeMiss.toString();
      this.updateGameRow();
      this.toastr.error('MISSED', '3 Pointer', {
      });
    }
    click3PTMake() {
      this.threeMake += 1;
      this.total += 3;
      this.shotsTaken += 1;
      this.shotsMade += 1;
      this.valueArray[6] = this.threeMake.toString();
      this.updateGameRow();
      this.toastr.success('BANG! ' + this.total + ' Points', '3 Pointer', {
      });
    }

    clickOffRebound() {
      this.offReb += 1;
      this.valueArray[7] = this.offReb.toString();
      this.updateGameRow();
      this.toastr.success('Offensive', 'Rebound', {
      });
    }

    clickDefRebound() {
      this.defReb += 1;
      this.valueArray[8] = this.defReb.toString();
      this.updateGameRow();
      this.toastr.success('Defensive', 'Rebound', {
      });
    }

    clickAssist() {
      this.ast += 1;
      this.valueArray[9] = this.ast.toString();
      this.updateGameRow();
      this.toastr.success('Nice pass right there!!', 'Assist', {
      });
    }

    clickTurnover() {
      this.to += 1;
      this.valueArray[12] = this.to.toString();
      this.updateGameRow();
      this.toastr.error('', 'Turnover', {
      });
    }

    clickFoulDrawn() {
      this.pfd += 1;
      this.valueArray[14] = this.pfd.toString();
      this.updateGameRow();
      this.toastr.info('', 'He gets fouled!', {
      });
    }

    clickShotBlocked() {
      this.sblk += 1;
      this.valueArray[15] = this.sblk.toString();
      this.updateGameRow();
      this.toastr.warning('', 'Shot Blocked', {
      });
    }

    clickSteal() {
      this.stl += 1;
      this.valueArray[10] = this.stl.toString();
      this.updateGameRow();
      this.toastr.success('', 'He Steals it!', {
      });
    }

    clickBlock() {
      this.blk += 1;
      this.valueArray[11] = this.blk.toString();
      this.updateGameRow();
      this.toastr.success('Rim Protector!', 'Blocked', {
      });
    }

    clickFoul() {
      this.pf += 1;
      this.valueArray[13] = this.pf.toString();
      this.updateGameRow();
      this.toastr.error('Foul', '', {
      });
    }

    /** Clear all stat fields when starting fresh */
    resetAllStats() {
      this.ft0 = 0;
      this.ftm = 0;
      this.twoMake = 0;
      this.twoMiss = 0;
      this.threeMiss = 0;
      this.threeMake = 0;
      this.pf = 0;
      this.offReb = 0;
      this.defReb = 0;
      this.stl = 0;
      this.ast = 0;
      this.pfd = 0;
      this.sblk = 0;
      this.to = 0;
      this.blk = 0;
      this.total = 0;
      this.shotsTaken = 0;
      this.shotsMade = 0;
      this.ftTaken = 0;
      this.ftMade = 0;

      this.toastr.success('Stats have been cleared and ready for the next game!', 'Happy Stat-ing!', {
        // disableTimeOut: true
      });
    }

    shotPct(): string {
      if (this.shotsTaken > 0) {
        return (this.shotsMade / this.shotsTaken).toFixed(2);
      } else {
        return '0';
      }
    }

    ftPct(): string {
      if (this.ftTaken > 0) {
        return (this.ftMade / this.ftTaken).toFixed(2);
      } else {
        return '0';
      }
    }

    threePct(): string {
      if ((this.threeMake + this.threeMiss) > 0) {
        return (this.threeMake / (this.threeMiss + this.threeMake)).toFixed(2);
      } else {
        return '0';
      }
    }

    grow() {
      this.goFull = !this.goFull;
    }

    getRating(): string {
      var left = this.total + this.offReb + this.defReb + this.ast + this.stl + this.blk + this.pfd;
      var right = this.twoMiss + this.threeMiss + this.ft0 + this.to + this.pf + this.sblk;

      var eff = left - right;
      return eff.toString();
    }

/*     setDefaultS() {
      (<HTMLInputElement>document.getElementById('ssID')).value = '11RaW4d_0L8UaTBj00AvZ1_vlJQEqm1r-vSAlNtSR3gs';
    }
    setDefaultI() {
      (<HTMLInputElement>document.getElementById('ssID')).value = '1wk3nqWyyZ77g-wYgWYjIxCNUxTLonQexPv8O2l0VHjM';
    } */

}
