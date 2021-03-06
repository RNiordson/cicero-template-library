/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */

/**
 * Execute the smart clause
 * @param {Context} context - the Accord context
 * @param {org.accordproject.ippayment.PaymentRequest} context.request - the incoming request
 * @param {org.accordproject.ippayment.PayOut} context.response - the response
 * @param {org.accordproject.base.Event} context.emit - the emitted events
  @param {org.accordproject.cicero.contract.AccordContractState} content.state - the state
 * @AccordClauseLogic
 */
function execute(context) {
    var req = context.request;
    var res = context.response;
    var contract = context.contract;
    var now = moment(req.timestamp);

    var royaltiesAmount = request.netSaleRevenue * contract.royaltyRate / 100.00;
    var sublicensingAmount = request.sublicensingRevenue * contract.sublicensingRoyaltyRate / 100.00;
    res.totalAmount = royaltiesAmount + sublicensingAmount;
    
    if (!req.permissionGrantedBy) {
        // TODO: add for other kinds of duration than DAY-based
        res.dueBy = now.endOf('quarter').add(contract.paymentPeriod.amount,'d').format('MM-DD-YYYY');
    } else {
        // TODO: add for other kinds of duration than DAY-based
        res.dueBy = moment(req.permissionGrantedBy).add(contract.paymentPeriodWithPermission.amount,'d').format('MM-DD-YYYY');
    }
}

/* eslint-enable no-unused-vars */
/* eslint-enable no-undef */
