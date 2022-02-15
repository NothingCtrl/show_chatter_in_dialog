odoo.define('show_chatter_in_dialog.form_renderer', function (require) {
    "use strict";

    var Chatter = require('mail.Chatter');
    var FormRenderer = require('web.FormRenderer');

    /**
     * Include the FormRenderer to instanciate the chatter area containing (a
     * subset of) the mail widgets (mail_thread, mail_followers and mail_activity).
     */
    FormRenderer.include({
        /**
         * Overrides the function that renders chatter in dialog view (modal/popup view)
         *
         * @override
         * @private
         */
        _renderNode: function (node) {
            var self = this;
            if (node.tag === 'div' && node.attrs.class === 'oe_chatter') {
                // --- start: comment out to show chatter in dialog ---
                // if (this.isFromFormViewDialog) {
                //     return $('<div/>');
                // }
                // --- end ---
                if (!this.chatter) {
                    this.chatter = new Chatter(this, this.state, this.mailFields, {
                        isEditable: this.activeActions.edit,
                        viewType: 'form',
                    });

                    var $temporaryParentDiv = $('<div>');
                    this.defs.push(this.chatter.appendTo($temporaryParentDiv).then(function () {
                        self.chatter.$el.unwrap();
                        self._handleAttributes(self.chatter.$el, node);
                    }));
                    return $temporaryParentDiv;
                } else {
                    this.chatter.update(this.state);
                    return this.chatter.$el;
                }
            } else {
                return this._super.apply(this, arguments);
            }
        },
    });

});
